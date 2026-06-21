// bot.js — Telegram-бот игры 67
const TelegramBot = require('node-telegram-bot-api');

const TOKEN   = process.env.BOT_TOKEN;
const APP_URL = process.env.APP_URL;

if (!TOKEN)   { console.error('Нет BOT_TOKEN'); process.exit(1); }
if (!APP_URL) { console.error('Нет APP_URL');   process.exit(1); }

const bot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id,
    '🃏 *Игра 67* — карточная игра для 2–4 игроков\n\nНайдите комнату и сыграйте с друзьями!',
    {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [[
          { text: '🎮 Играть', web_app: { url: APP_URL } }
        ]]
      }
    }
  );
});

bot.onText(/\/help/, (msg) => {
  bot.sendMessage(msg.chat.id,
    `*Правила игры 67*\n\n` +
    `*Колода:* 28 карт — 4 масти × 7 номиналов\n` +
    `*Масти:* + ☽ ♚ ☀\n` +
    `*Номиналы:* 6 В Д К Т 7 8\n\n` +
    `*Особые масти:*\n` +
    `• ♚ — козырная (бьёт все обычные масти)\n` +
    `• + — особая (кроется только картами +)\n\n` +
    `*Спецкарты:*\n` +
    `• *6* — переворот направления хода\n` +
    `• *7* — нельзя перевернуть шестёркой\n` +
    `• *8* — переворот + право хода бросившему\n` +
    `• *Д+* — бьёт всё, все карты в биту, переворот\n\n` +
    `*Цель:* первым избавиться от всех карт`,
    { parse_mode: 'Markdown' }
  );
});

bot.on('polling_error', err => console.error('polling:', err.message));
console.log('Бот 67 запущен ✓');
