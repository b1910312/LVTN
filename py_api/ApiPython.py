# from transformers import AutoModelForSequenceClassification, AutoTokenizer
# import torch

# # Load pre-trained PhoBERT model and tokenizer
# tokenizer = AutoTokenizer.from_pretrained("vinai/phobert-base")
# model = AutoModelForSequenceClassification.from_pretrained("vinai/phobert-base", num_labels=2)  # assuming binary classification

# # Bình luận cần phân tích cảm xúc
# comment = "Chất lượng sách quá tệ, nhưng họ chắm sóc khách hàng rất tốt."

# # Tokenize and encode the comment
# inputs = tokenizer(comment, return_tensors="pt")

# # Make prediction
# outputs = model(**inputs)

# # Get predicted label (0: negative, 1: positive)
# predicted_label = torch.argmax(outputs.logits).item()

# # Print the result
# if predicted_label == 0:
#     print("Tính cảm xúc tiêu cực")
# else:
#     print("Tính cảm xúc tích cực")

from flask import Flask, request, jsonify
from transformers import AutoModelForSequenceClassification, AutoTokenizer
import torch
from flask_cors import CORS
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel


app = Flask(__name__)
CORS(app)


def add_data_to_csv(file_path, new_data):
    try:
        df = pd.read_csv(file_path)
    except FileNotFoundError:
        df = pd.DataFrame(columns=['S_Ma', 'S_Ten', 'S_TacGia', 'S_SoLuong', 'S_Gia', 'S_TheLoai', 'S_NXB', 'S_NgayNhap', 'S_NgayCapNhat'])

    df = df._append(new_data, ignore_index=True)
    df.to_csv(file_path, index=False)

@app.route('/add_product', methods=['POST'])
def add_product():
    try:
        # Lấy dữ liệu từ request body dưới dạng JSON
        new_product = request.json

        # Kiểm tra xem có đủ thông tin cần thiết không
        required_fields = ['S_Ma', 'S_Ten', 'S_TacGia', 'S_SoLuong', 'S_Gia', 'S_TheLoai', 'S_NXB', 'S_NgayNhap', 'S_NgayCapNhat']
        for field in required_fields:
            if field not in new_product:
                return jsonify({'error': f'Missing field: {field}'}), 400

        # Thực hiện thêm dữ liệu vào CSV
        file_path = 'Sach.csv'
        add_data_to_csv(file_path, new_product)

        return jsonify({'success': True}), 200

    except Exception as e:
        print("Error:", str(e))
        return jsonify({'error': str(e)}), 500

# Đọc dữ liệu từ file CSV
df = pd.read_csv('Sach.csv')

# Thêm dữ liệu thể loại và tác giả
df['S_TacGia'] = df['S_TacGia'].astype(str)
df['S_TheLoai'] = df['S_TheLoai'].astype(str)
df['S_NXB'] = df['S_NXB'].astype(str)

# Tính toán TF-IDF cho từ khoá, thể loại và tác giả
tfidf_vectorizer = TfidfVectorizer()
tfidf_matrix = tfidf_vectorizer.fit_transform(df['S_Ten'])

S_TheLoai_vectorizer = TfidfVectorizer()
S_TheLoai_matrix = S_TheLoai_vectorizer.fit_transform(df['S_TheLoai'])

S_TacGia_vectorizer = TfidfVectorizer()
S_TacGia_matrix = S_TacGia_vectorizer.fit_transform(df['S_TacGia'])

S_Nxb_vectorizer = TfidfVectorizer()
S_Nxb_matrix = S_Nxb_vectorizer.fit_transform(df['S_NXB'])

# Tính toán sự tương tự cosine cho từ khoá, thể loại và tác giả
cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
S_TheLoai_cosine_sim = linear_kernel(S_TheLoai_matrix, S_TheLoai_matrix)
S_TacGia_cosine_sim = linear_kernel(S_TacGia_matrix, S_TacGia_matrix)
S_Nxb_cosine_sim = linear_kernel(S_Nxb_matrix, S_Nxb_matrix)

# Kết hợp ma trận tương tự từ khoá, thể loại và tác giả
combined_cosine_sim = (cosine_sim + S_TheLoai_cosine_sim + S_TacGia_cosine_sim + S_Nxb_cosine_sim) / 4

# Hàm đưa ra gợi ý cho người dùng
def recommend_products(product_id, combined_cosine_sim=combined_cosine_sim):
    idx = df[df['S_Ma'] == product_id].index[0]
    product_scores = combined_cosine_sim[idx]
    recommended_products = sorted(list(enumerate(product_scores)), key=lambda x: x[1], reverse=True)
    return recommended_products

@app.route('/delete_product', methods=['POST'])
def delete_product():
    try:
        # Nhận dữ liệu từ request body dưới dạng JSON
        data = request.json

        # Kiểm tra xem có trường 'S_Ma' không
        if 'S_Ma' not in data:
            return jsonify({'error': 'Invalid request. "S_Ma" field is missing.'}), 400

        product_id_to_delete = str(data['S_Ma'])

        # Kiểm tra xem sản phẩm có tồn tại không
        if product_id_to_delete not in df['S_Ma'].values:
            return jsonify({'error': 'Product not found.'}), 404

        # Thực hiện xóa dữ liệu khỏi CSV
        df.drop(df[df['S_Ma'] == product_id_to_delete].index, inplace=True)
        df.to_csv('Sach.csv', index=False)

        return jsonify({'success': True}), 200

    except Exception as e:
        print("Error:", str(e))
        return jsonify({'error': str(e)}), 500


# Route API
@app.route('/recommend', methods=['GET'])
def recommend():
    # Nhận tham số từ request
    product_id_to_recommend = request.args.get('product_id')
    # Dự đoán và in ra gợi ý cho sản phẩm
    recommendations = recommend_products(product_id_to_recommend)
    # Chuẩn bị kết quả để trả về dưới dạng JSON
    result = []
    top_n = 10
    for i in range(top_n):
        if i < len(recommendations):
            product_idx, score = recommendations[i]
            if product_idx != df[df['S_Ma'] == product_id_to_recommend].index[0]:
                if product_idx < len(df):
                    result.append({
                        "Recommendation": i + 1,
                        "S_Ma": df.iloc[product_idx]['S_Ma'],
                        "S_Ten": df.iloc[product_idx]['S_Ten'],
                        "S_TacGia": df.iloc[product_idx]['S_TacGia'],
                        "S_Gia": str(df.iloc[product_idx]['S_Gia']),
                        "Score": score
                    })
                else:
                    result.append({"Error": f"Invalid index: {product_idx}"})
        else:
            result.append({"Message": "Not enough recommendations."})

    return jsonify(result)

# Load pre-trained PhoBERT model and tokenizer
tokenizer = AutoTokenizer.from_pretrained("vinai/phobert-base")
model = AutoModelForSequenceClassification.from_pretrained("vinai/phobert-base", num_labels=2)  # assuming binary classification

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'OPTIONS':
        response = app.make_default_options_response()
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        return response

    data = request.get_json()
    if 'comment' not in data:
        return jsonify({'error': 'Invalid request. "comment" field is missing.'})

    comment = data['comment']

    # Tokenize and encode the comment
    inputs = tokenizer(comment, return_tensors="pt")

    # Make prediction
    outputs = model(**inputs)

    # Get predicted label (0: negative, 1: positive)
    predicted_label = torch.argmax(outputs.logits).item()

    result = predicted_label
    return jsonify(result)

if __name__ == '__main__':
    app.run(port=5000, debug=True)

