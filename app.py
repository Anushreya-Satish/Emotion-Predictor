from flask import Flask , render_template , request , jsonify
import sentiment_analysis as sa

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')


@app.route('/predict' , methods = ['POST'])
def predict():

    response = ""
    review = request.json.get('customer_review')

    if not review:

        response = jsonify({'status' : 'Error' , 
                            'message' : 'Empty Review'})

    else:

        sentiment , emoji_url = sa.predict(review)
        response = jsonify({'status' : 'Success',
                            'prediction' : sentiment,
                            'url' : emoji_url})

    return response

if __name__  ==  "__main__":
    app.run(debug = True)