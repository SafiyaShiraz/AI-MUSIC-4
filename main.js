song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist= 0;


function setup()
{
    canvas = createCanvas(500, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

poseNet= ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses);
}

function draw()
{
image(video, 0, 0, 500, 500);
fill("red");
stroke("red");

if(scoreLeftWrist > 0.2)
{
circle(leftWristX, leftWristY, 30);
InNumberLeftWristY=Number(leftWristY);
remove_decimal= floor(inNumberleftWristY);
volume=remove_decimal/500;
document.getElementById("volume").innerHTML = "Volume=" + volume;
song.setVolume(volume);
}
}

function preload()
{
    song = loadSound("music.mp3");
}

function playsong()
{
    song.play();
    song.setVolume(0.5);
    song.rate(1);
}

function modelLoaded()
{
console.log("PoseNet Model Loaded");

}

function gotPoses(results)
{

    if(results.length > 0)
    {


        console.log(results);
scoreLeftWrist = results[0].pose.keypoints[9].score;
console.log("Score Left Wrist="+scoreLeftWrist);

leftWristX = results[0].pose.leftWrist.x;
leftWristY = results[0].pose.leftWrist.y;    
console.log("Left Wrist X=" + leftWristX + "Left Wrist Y=" + leftWristY);

rightWristX = results[0].pose.rightWrist.x;    
rightWristY = results[0].pose.rightWrist.y;    
console.log("Right Wrist X=" + rightWristX + "Right Wrist Y=" + rightWristY);
}

}












