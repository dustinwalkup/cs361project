# cs361project

BTC ATM Locator is a project that was designed and developed for CS 361 Software Engineering I at Oregon State in the Spring of 2021

This project was part of a microservices project with 4 other students from the class. It consumes the BTC to USD conversion rate as an API from another service

This project also serves as a Wikipedia page PDF scraper

API Guide

This API will scrape any Wikipedia page and return a list of PDF strings from the citation section

https://btcatmlocator.herokuapp.com/api/scrape/subject

Replace 'subject' with the page you would like to scrape. The URL is case sensitive, input the subject exactly how it is written in the Wikipedia URL.

Example:

https://en.wikipedia.org/wiki/World_War_II

https://btcatmlocator.herokuapp.com/api/scrape/World_War_II

Return:

[
"https://web.archive.org/web/20150626151411/http://www.igipz.pan.pl/en/zpz/Political_migrations.pdf",
"http://www.igipz.pan.pl/en/zpz/Political_migrations.pdf",
"http://rcin.org.pl/Content/15652/WA51_13607_r2011-nr12_Monografie.pdf",
"https://web.archive.org/web/20140520220409/http://rcin.org.pl/Content/15652/WA51_13607_r2011-nr12_Monografie.pdf",
"https://www.amnesty.org/en/documents/act30/011/2006/en/",
"https://web.archive.org/web/20121122071204/http://artukraine.com/old/famineart/SovietCrimes.pdf",
"http://artukraine.com/old/famineart/SovietCrimes.pdf",
"http://sovietinfo.tripod.com/ELM-War_Deaths.pdf",
"https://web.archive.org/web/20110709141048/http://www.strom.clemson.edu/publications/sg-war41-45.pdf",
"http://www.strom.clemson.edu/publications/sg-war41-45.pdf",
"http://jah.oxfordjournals.org/content/99/1/24.full.pdf",
"http://www.strategicstudiesinstitute.army.mil/pdffiles/PUB622.pdf"
]
