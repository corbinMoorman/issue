//Create date variable
var date = new Date()
var display_date = 'Date:' + date.toLocaleDateString()

//Load HTML DOM
$(document).ready(function(){
    $('#display_date').html(display_date)
})
//Define variable to store predicted emotion
var predicted_emotion;

//HTML-->JavaScript--->Flask
//Flask--->JavaScript--->HTML

//jQuery selector and click action

$(function () {
    $("#predict_button").click(function () {

        var input_text = {
            "text" : $("#text").val()
        }
        //AJAX call

        $.ajax({
            url:"/predict-emotion",
            type:'POST',
            data:JSON.stringify(input_text),
            dataType:'json',
            contentType:"application/json",
            success: function(result){
                
                // Result Received From Flask ----->JavaScript
                predicted_emotion = result.data.predicted_emotion;

                emoji_url =  result.data.predicted_emotion_img_url;               
                // Display Result Using JavaScript----->HTML
                $("#prediction").html(predicted_emotion)
                $('#prediction').css("display","block")

                $('#emo_img_url').attr('src', emoji_url);
                $('#emo_img_url').css("display","block")
                
            },
            //Error function
            error: function (result) {
                alert(result.responseJSON.message)
            }
        });
    });
})

