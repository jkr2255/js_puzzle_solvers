!function r(t,n,e){function i(s,u){if(!n[s]){if(!t[s]){var f="function"==typeof require&&require;if(!u&&f)return f(s,!0);if(o)return o(s,!0);var a=new Error("Cannot find module '"+s+"'");throw a.code="MODULE_NOT_FOUND",a}var c=n[s]={exports:{}};t[s][0].call(c.exports,function(r){var n=t[s][1][r];return i(n?n:r)},c,c.exports,r,t,n,e)}return n[s].exports}for(var o="function"==typeof require&&require,s=0;s<e.length;s++)i(e[s]);return i}({1:[function(){"use strict";var r=self.Module={};importScripts("../bin/minisat.js"),addEventListener("message",function(t){var n=t.data,e=r.cwrap("solve_string","string",["string","int"]),i={result:"",stdout:"",stderr:""};r.print=function(r){i.stdout+=r+"\n"},r.printErr=function(r){i.stderr+=r+"\n"};try{i.result=e(n,n.length)}catch(t){r.printErr("Error: "+t)}self.postMessage(i)},!1)},{}]},{},[1]);