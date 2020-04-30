//NipBot will attempt to automatically manage boarding groups for nip selling. It should allow a user to create a session and then accounce the active session in discord with the advertised price.
//Users can request tickets, which will add them to a queue. Nipbot will automatically PM the next boarding group with the dodo code when the previous boarding groups' time has elapsed.
//
//commands: !startsession (dodo code) (nip price)	- pm the bot to begin a session with (dodo code). Maybe another arg for nip price? each user can have only one active 
//														session at a time. If they call !startsession with an active session it should update the dodo code and clear the queue. It should instruct anyone still in the queue to request another ticket.
//		   	!endsession 							- pm the bot to end the session. The session should automatically end if a certain time has passed.
//			!ticket (session ID) 					- post in chat to request a ticket to the session with ID (session ID), this will add the user to a queue. Will deny the request if user has an active ticket.
//
//optional:  !activesessions							- displays a list of active sessions with the host's name, ID, and nip price
//




// Load up the discord.js library
const Discord = require("discord.js");

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`the Stalk Market`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});





//List of all currently active sessions with INFO ABOUT THEM n stuff
const activeSessions = [];
var seshCounter = 0;

function Session(dodo, price, user, time, ID){
		this.dodoCode = dodo;
		this.nipPrice = price;
		this.user = user;
		this.startTime = time;
		this.ID = ID;
}






client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Let's go with a few common example commands! Feel free to delete or change those.
  
  
  if(command === "startsession") {
	//usage: !startsession dodoCode nipPrice
    if(args.length != 2){
		message.channel.send("Usage: !startsession dodoCode nipPrice");
	}else{
		const dodoCode = args[0];
		const nipPrice = args[1];
		const seshID = ++seshCounter;
		//creating the session object and adding it to the activeSessions
		let sesh = new Session(dodoCode, nipPrice, message.member., message.createdAt);
		activeSessions.push(sesh);
		
		
		message.channel.send("Session created! Type !endsession when you are ready to close your island.")
		client.channels.get('694336316913090570').send(message.member + " has created a new session with price " + nipPrice + "bells! Type '!ticket " + sesh.ID + "' to reserve a spot in an upcoming boarding group!");
	}
	
  }
  
  if(command === "say") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
  }
});

client.login(config.token);