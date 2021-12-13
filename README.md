# Sticky messages disocrd bot
<div align="center">
  <br />
    <h1>Discord Sticky Message Bot</h1>
  <br />
  <p>
    <a href="https://www.gnu.org/licenses/gpl-3.0.en.html"><img src="https://img.shields.io/badge/License-GPLv3-blue.svg" alt="License" /></a>
  </p>
  <img src="https://media.discordapp.net/attachments/919881476856758363/919886085235019796/unknown.png" alt="Bot preview" />
</div>

## Features 
- embed ( [Easily create an object embed message](https://discord.club)) messages and buttons, and supports normal messages as well
- It stores local storage data in json files
- Accurate because the last hands of a message sent by the bot are stored accurately

## Contributing
- I only welcome pull requests that fix bug, typo, or broken arabic.
- If you want to add new feature to this bot, just fork this repository.

## Getting Started

1. Clone or [download](https://github.com/shuruhatik/sticky-message-bot/releases) this repository
2. Go to the folder where you clone or download this repository
3. Type `npm install` or `yarn install` depend on what you use
4. Rename `.env.example` to `.env` and fill that file. Below is the explanation.
```env
token=(fill your bot token here)
```
- Note for a project that you can run with more than one bot only by setting a new token value with any numbers or letters you want, for example
```env
token2=(fill your bot 2 token here)
token3=(fill your bot 2 token here)
```
- Note: You can write any number after the token, but the value must start with the word token, small letters
- You can put any other value like embed-1 and make its value contain a string inside it the object of an embed message and when creating a sticky message you can write the name embed-1 to send this object of the message
```env
embed-1="{\n  \"content\": \"test\",\n  \"embeds\": [\n    {\n      \"color\": 16711680,\n      \"timestamp\": \"\",\n      \"author\": {\n        \"name\": \"test\"\n      },\n      \"image\": {},\n      \"thumbnail\": {},\n      \"footer\": {},\n      \"fields\": []\n    }\n  ],\n  \"components\": [\n    {\n      \"type\": 1,\n      \"components\": [\n        {\n          \"type\": 2,\n          \"style\": 5,\n          \"label\": \"test\",\n          \"url\": \"https://www.npmjs.com/package/st.db\"\n        }\n      ]\n    }\n  ]\n}"
```


## Usage
- `/sticky_set channel: #chat content: Welcome in Chat`
- `/sticky_set channel: #chat content: embed-1`
- `/sticky_remove channel: #chat`

## Requirements
- [Node.js](https://nodejs.org) v10 or higher

## Library That I Use
- [Eris](https://abal.moe/Eris/)
- [ST.db](https://www.npmjs.com/package/st.db)

## License
[GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/)

