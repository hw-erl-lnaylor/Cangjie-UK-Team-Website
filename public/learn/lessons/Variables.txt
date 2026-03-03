Variables

You can declare variables with one of two modifiers: var or let.
var makes the variable mutable, while let makes it immutable.


Cangjie can infer the type of the variable most of the time, in this case from string literal. Because we defined a with var modifier, we can change its value after initilization.

To specify type of a varible you place ':' after its name followed by its type.
In this case f is of type string. Pay attention that f has let modifier, therefore we cannot modifiy it after initilization.


Thanks to pattern matching in Cangjie, we can declare multiple variables at the same time using tuples. Because we declared a tuple using var modifier, both b and c are also mutable.


Until e is initilized with value, we cannot use it in any expressions. Calling println(e) would cause error.


