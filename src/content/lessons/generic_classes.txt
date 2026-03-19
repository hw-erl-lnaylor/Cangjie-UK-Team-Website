Generic Classes

To create a generic class in Cangjie you just place any number of type parameters after the name of the class in <>. Then you can use your type parameter throughout your class. If you want to introduce type constrains, you place it after 'where'. (T <: T means absolutly nothing -- each types fullfills that)

Because we dont know what type T will be, we dont know whether it has some default constructor or value, so we have to use an option for initilization of the  array (we set a default value of None).





Parameter variable 'value', has type T.







Return of function remove is also T.



getOrThrow is a function that operates on Options, and allows us to extract value from inside an option, as long as its not None.






We can instanciate Queue for strings using this syntax.


Adding elements to the queue is straightforward

Removing elements is also simple. (keep in mind remove() returns T)


Instanciation for Ints is the same as for strings, with different type.
