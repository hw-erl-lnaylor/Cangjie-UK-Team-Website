Accesing Thread

Newly created threads in Cangjie can end in advance if the thread that created them terminates. However, you can use the return value of a thread to wait until the thread execution is complete. 
The return value of a thread is Future<T>. You can also think about it like a box that promises that this value will be calculated, you just have to wait.





Normal function call.


Return value of a thread, is of type Future<Int64>.





Here we use one of the functions of Future, .get(), which waits for a thread to finish execution and produce a value. This way, the main thread will never finish before the newly created ones.