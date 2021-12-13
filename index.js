Object.entries(process.env).filter(e => e[0].startsWith("token")).forEach((token, indexArray) => {
  const Eris = require("eris");
  const bot = new Eris(token[1], { intents: 32509 });
  const app = require('express')().get('/', async (r, s) => s.send(require("./package.json").description)).listen(3000);
  const Database = require("st.db");
  const db = new Database({
    path: 'data.json',
    crypto: {
      encrypt: true,
      password: require("./package.json")['author']
    }
  });

  bot.on("error", (err) => {
    console.error(err);
  });

  bot.on("ready", async () => {
    console.clear()
    console.log(`\u001b[${34 + indexArray}mSticky Messages Bot\u001b[0m\n\u001b[37m►\u001b[${34 + indexArray}m Version: \u001b[37m\u001b[48;5;11m${require("./package.json")['version']}\u001b[0m\n\u001b[37m►\u001b[${34 + indexArray}m Bot By: \u001b[37m\u001b[48;5;45m${require("./package.json")['author']}\u001b[0m\n\u001b[37m►\u001b[${34 + indexArray}m Bot Name: \u001b[47;1m\u001b[193;1m${bot.user.username}\u001b[0m\n\u001b[37m►\u001b[${34 + indexArray}m Eris Version: \u001b[47;1m\u001b[33;1m${require("./package.json")['dependencies'].eris}\u001b[0m`)
    const commands = await bot.getCommands();
    if (!commands.some(e => e.name.startsWith("sticky"))) {
      await bot.createCommand({
        name: "sticky_set",
        description: "لإنشاء رسالة لاصقة على قناة معين",
        options: [
          {
            "name": "channel",
            "description": "الروم الذي تريد بيه الرسالة لاصقة",
            "type": Eris.Constants.ApplicationCommandOptionTypes.CHANNEL,
            "required": true,
            "channel_types": [0]
          },
          {
            "name": "content",
            "description": "اكتب الرسالة التي تريدها سواء كانت أمبد أو عادية",
            "type": Eris.Constants.ApplicationCommandOptionTypes.STRING,
            "required": true,
          }
        ],
        type: Eris.Constants.ApplicationCommandTypes.CHAT_INPUT
      });
      await bot.createCommand({
        name: "sticky_remove",
        description: "لحذف رسالة لاصقة على قناة معين",
        options: [
          {
            "name": "channel",
            "description": "الروم الذي تريد الغاء بيه الرسالة اللاصقة",
            "type": Eris.Constants.ApplicationCommandOptionTypes.CHANNEL,
            "required": true,
            "channel_types": [0]
          }
        ],
        type: Eris.Constants.ApplicationCommandTypes.CHAT_INPUT
      });
    }
  });

  bot.on("messageCreate", async (msg) => {
    if (msg.author.id == bot.user.id) return;
    if (await db.has(`stickychannel_${bot.user.id}_${msg.channel.id}`) == true) {
      let data = await db.getByKey({
        key: `stickychannel_${bot.user.id}_${msg.channel.id}`,
        decrypt: true
      })
      await bot.deleteMessage(msg.channel.id, data.msgId).catch(e => { })
      let msgId;
      try {
        msgId = await bot.createMessage(msg.channel.id, JSON.parse(process.env[data.msg]));
      } catch (e) {
        msgId = await bot.createMessage(msg.channel.id, data.msg);
      }
      data['msgId'] = msgId.id
      await db.set({
        key: `stickychannel_${bot.user.id}_${msg.channel.id}`,
        value: data
      })
    }
  });

  bot.on("interactionCreate", async (interaction) => {
    if (interaction instanceof Eris.CommandInteraction) {
      if (interaction.data.name == "sticky_set") {
        if (!interaction.member.permission.has("administrator")) return await interaction.createMessage(`:x: ليس لديك صلاحيات لقيام بذلك`);
        let channelId = interaction.data.options[0].value
        let msgId
        try {
          msgId = await bot.createMessage(channelId, JSON.parse(process.env[interaction.data.options[1].value]));
        } catch (e) {
          msgId = await bot.createMessage(channelId, interaction.data.options[1].value);
        }
        await db.set({
          key: `stickychannel_${bot.user.id}_${channelId}`,
          value: {
            msg: interaction.data.options[1].value,
            msgId: msgId.id
          }
        })
        await interaction.createMessage({
          embeds: [
            {
              "title": "تم **إنشاء** رسالة للاصقة بنجاح ✅",
              "description": `<#${channelId}>`,
              "color": 1013218,
              "footer": {
                "text": `بوت من صنع ${require("./package.json")['author']}`
              }
            }
          ],
          flags: 64
        });
      } else if (interaction.data.name == "sticky_remove") {
        if (!interaction.member.permission.has("administrator")) return await interaction.createMessage(`:x: ليس لديك صلاحيات لقيام بذلك`);
        let channelId = interaction.data.options[0].value
        if (await db.has(`stickychannel_${channelId}`) != true) return await interaction.createMessage(`:x: لا توجد رسائل ثابتة تم إنشاؤها فعليًا في ذاكرة القراءة فقط`);
        await db.delete({
          key: `stickychannel_${bot.user.id}_${channelId}`
        })
        await interaction.createMessage({
          embeds: [
            {
              "title": "تم **إلغاء** رسالة اللاصقة بنجاح ✅",
              "description": `<#${channelId}>`,
              "color": 1013218,
              "footer": {
                "text": `بوت من صنع ${require("./package.json")['author']}`
              }
            }
          ],
          flags: 64
        });
      }
    }
  });

  bot.connect();
})