NipBot will attempt to automatically manage boarding groups for nip selling. It should allow a user to create a session and then accounce the active session in discord with the advertised price.
Users can request tickets, which will add them to a queue. Nipbot will automatically PM the next boarding group with the dodo code when the previous boarding groups' time has elapsed.

commands:	!startsession (dodo code) (nip price)	- pm the bot to begin a session with (dodo code). Each user can have only one active session at a time. If they call !startsession with an active session it should update the dodo code and clear the queue. It should instruct anyone still in the queue to request another ticket.
		!endsession - pm the bot to end the session. The session should automatically end if a certain time has passed.
		!ticket (session ID) - request a ticket to the session with ID (session ID), this will add the user to a queue. Will deny the request if user has an active ticket.

optional:	!activesessions	- displays a list of active sessions with the host's name, ID, and nip price

