Iterators

To implement iteration functionality for user-defined type, it has to implement 
Iterable interface.


User-created class that implements Iterable interface. Function iterator, returns
an Iterator object, which we have to defined specificly for MyArray class.














MyArrayIter inheritcs from Iterator abstract class, and has to implement 
method next().
























Here we have for extended for-loops over our class MyArray. It is only possible
because it implements iterable interface. We dont have to traverse it in order,
we can get creative with the MyArrayIter class.