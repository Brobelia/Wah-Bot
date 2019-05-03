const Discord = require('discord.js');
const brain = require('brain.js');
const { prefix, game, token, giphyToken } = require('./config.json');
const client = new Discord.Client();
/*
const network = new brain.NeuralNetwork()

network.train([
    {input: "hello", output: "Howdy!"},
    {input: "smash bros", output: ":("},
    {input: "sky", output: "blue"},
    {input: "fortnite", output: "do not want"}
])

const result = network.run()
*/
var GphApiClient = require('giphy-js-sdk-core')
giphy = GphApiClient(giphyToken)

function isNumber(num)
{
    return !isNaN(parseFloat(num)) && isFinite(num);
}

function sortNumber(a,b)
{
    return a - b;
    /*
        var numArray = [140000, 104, 99];
        numArray.sort(sortNumber);
    */
}

function sortNumberReverse(a,b)
{
    return b - a;
    /*
        var numArray = [140000, 104, 99];
        numArray.sort(sortNumberReverse);
    */
}


function rng(x)
{
    var rng = Math.floor((Math.random() * x) + 1)
    console.log("random number: " + rng);
    return rng;
}

client.once('ready', () => {
    console.log('Ready!') //simply lets me know in the terminal that it is ready
    client.user.setActivity("Smash Bros...", {type: "Watching"})
})

client.on('message', message => 
{
    console.log(message.content); //cpy message to terminal
    //if(message.content.startsWith(`${prefix}kick`)) //starts with word
    //if (message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])){} //only works for people with kick and ban permissions

    /*
        //kicks a member
        let member = message.mentions.members.first();
        member.kick().then((member => {
            message.channel.send(":wave: " + member.displayName + " has been kicked!")
        })
        */

    if(message.content.startsWith(`${prefix}fail`)) 
    {
        message.channel.send("fail") //say the word fail

        giphy.search('gifs', {"q": "fail"})
            .then((response) => 
            {
                var totalResponses = response.data.length;
                //var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
                var responseIndex = rng(10) % totalResponses;
                var responseFinal = response.data[responseIndex]

                message.channel.send("<:etika:572046376133853185>", {
                    files: [responseFinal.images.fixed_height.url]
                })

            }).catch(() => {
                message.channel.send('I am Error')
            })        
    }

    //if(isNumber(message.content.charAt(0), 10) && message.content.charAt(1) == 'd' && isNumber(message.content.charAt(2), 10))
    var dnd = message.content.split("d")

    if(isNumber(dnd[0]) && isNumber(dnd[1]))
    {
        console.log("ACTIVATE DICE ROLL"); 
        var dy, dx, result;
        dy = parseInt(dnd[0], 10);
        console.log("Number of dice: " + dy);
        dx = parseInt(dnd[1], 10);
        console.log("Number of sides: " + dx);
        result = 0;

        for(var i = 0; i < dy; i++)
        {
            result += rng(dx);
            console.log("Result is: " + result);
        }

        message.channel.send(result.toString())
    }

    if(message.content.startsWith(`${prefix}ABS`)) 
    {
        //create ABS for new character
        var ABS = [];
        for (var i = 0; i < 6; i++)
        {
            var rolls = [];
            for (var j = 0; j < 4; j++)
            {
                rolls.push(rng(6));
            }
            console.log("Rolls are " + rolls);
            rolls.sort(sortNumber);
            console.log("Sorted rolls are " + rolls);
            rolls.unshift();
            console.log("Unshifted rolls are " + rolls);

            var score = 0;
            for (var k = 0; k < rolls.length; k++)
            {
                score += rolls[k];
                console.log("Score at roll " + k + " is: " + score);
            }
            ABS.push(score);
        }
        ABS.sort(sortNumberReverse);
        message.channel.send(ABS.toString())

    }

    if(message.content.startsWith(`${prefix}adv`)) 
    {
        //roll two d20 and take highest
        var rolls = [];
        rolls.push(rng(20));
        rolls.push(rng(20));
        message.channel.send(Math.max(rolls))

    }

    if(message.content.startsWith(`${prefix}dis`)) 
    {
        //roll two d20 and take lowest
        var rolls = [];
        rolls.push(rng(20));
        rolls.push(rng(20));
        message.channel.send(Math.min(rolls))
    }
})

client.login(token);