"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateBothText = exports.generateNumText = exports.generatePuncText = exports.generateBasicText = void 0;
const { english } = require("./assets/english");
const { webdev } = require("./assets/webdev");
const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
const giveMeAnArray = (cat) => {
    if (cat == "english")
        return english;
    if (cat == "webdev")
        return webdev;
};
const generateBasicText = (param, cat) => {
    const wordArr = giveMeAnArray(cat);
    // Random length between 8 and 10 words
    const sentenceLength = Math.floor(Math.random() * 3) + 8;
    var sentences = "";
    for (let j = 0; j < param; j++) {
        let sentence = "";
        for (let i = 0; i < sentenceLength; i++) {
            const randomIndex = Math.floor(Math.random() * wordArr.length);
            const word = wordArr[randomIndex];
            sentence += i === 0 ? capitalizeFirstLetter(word) : word;
            sentence += " ";
        }
        sentence = sentence.trim() + ".";
        sentences += sentence;
        sentences += " ";
    }
    return sentences;
};
exports.generateBasicText = generateBasicText;
const generatePuncText = (param, cat) => {
    const wordArr = giveMeAnArray(cat);
    const punctuationMarks = ["'", ",", "?", "!",];
    var sentences = "";
    for (let j = 0; j < param; j++) {
        // Random length between 8 and 10 words
        const sentenceLength = Math.floor(Math.random() * 3) + 8;
        let sentence = "";
        for (let i = 0; i < sentenceLength; i++) {
            const randomIndex = Math.floor(Math.random() * wordArr.length);
            const word = wordArr[randomIndex];
            sentence += i === 0 ? capitalizeFirstLetter(word) : word;
            const decisionNumber = Math.floor(Math.random() * 3);
            if (i < sentenceLength - 1 && decisionNumber == 0) {
                const randomNumber = Math.floor(Math.random() * 3); // Random index to select punctuation mark
                const punctuationMark = punctuationMarks[randomNumber];
                sentence += punctuationMark;
            }
            sentence += " ";
        }
        sentence = sentence.trim() + ".";
        sentences += sentence;
        sentences += " ";
    }
    return sentences;
};
exports.generatePuncText = generatePuncText;
const generateNumText = (param, cat) => {
    const wordArr = giveMeAnArray(cat);
    var sentences = "";
    for (let j = 0; j < param; j++) {
        // Random length between 8 and 10 words
        const sentenceLength = Math.floor(Math.random() * 3) + 8;
        let sentence = "";
        for (let i = 0; i < sentenceLength; i++) {
            const randomIndex = Math.floor(Math.random() * wordArr.length);
            const word = wordArr[randomIndex];
            sentence += i === 0 ? capitalizeFirstLetter(word) : word;
            sentence += " ";
            if (i < sentenceLength - 1) {
                const randomNumber = Math.floor(Math.random() * 1001); // Random number between 0 and 1000
                sentence += randomNumber;
                sentence += " ";
            }
        }
        sentence = sentence.trim() + ".";
        sentences += sentence;
        sentences += " ";
    }
    return sentences;
};
exports.generateNumText = generateNumText;
const generateBothText = (param, cat) => {
    const wordArr = giveMeAnArray(cat);
    const punctuationMarks = ["'", ",", "?", "!",];
    var sentences = "";
    for (let j = 0; j < param; j++) {
        // Random length between 8 and 10 words
        const sentenceLength = Math.floor(Math.random() * 3) + 8;
        let sentence = "";
        for (let i = 0; i < sentenceLength; i++) {
            const randomIndex = Math.floor(Math.random() * wordArr.length);
            const word = wordArr[randomIndex];
            sentence += i === 0 ? capitalizeFirstLetter(word) : word;
            const decisionNumber = Math.floor(Math.random() * 3);
            if (i < sentenceLength - 1 && decisionNumber == 0) {
                const randomNumber = Math.floor(Math.random() * 3); // Random index to select punctuation mark
                const punctuationMark = punctuationMarks[randomNumber];
                sentence += punctuationMark;
            }
            sentence += " ";
            if (i < sentenceLength - 1) {
                const randomNumber = Math.floor(Math.random() * 1001); // Random number between 0 and 1000
                sentence += randomNumber;
                sentence += " ";
            }
        }
        sentence = sentence.trim() + ".";
        sentences += sentence;
        sentences += " ";
    }
    return sentences;
};
exports.generateBothText = generateBothText;
