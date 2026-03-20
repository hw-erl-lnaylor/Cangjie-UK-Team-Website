Console IO

Input and output from console is done through std.console

These function calls return the option type, this because the console
may be unable to read any data if its redirected to an empty file. We can use
getOrThrow to access the contents.
Using Console.stdOut.write() ensures thread safety