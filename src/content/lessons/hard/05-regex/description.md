Regex

For all regexes command reference this website: 
https://cangjie-lang.cn/en/docs?url=%2F0.53.13%2Flibs%2
Fsource_en%2Fstd%2Fregex%2Fregex_package_overview.html



This is a string in which we will look for our pattern.





Initilize the regex. Lets break it down:
\\S - matches any non-white space character
* - matches preceding subexpression 0 or more times.
@ - matches single character '@'
[a-z] - matches any character that is a letter.
+ - matches preceding subexpression 1 or more times.

Initilize matcher with string and regex.
Get the number of matches.

For each match, extract it from the string.

matcher.find() returns the first not yet extracted match. It is returned as an Option<MatchData>.
We print the matched expression.