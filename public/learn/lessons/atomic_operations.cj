import std.sync.*
import std.time.*
import std.collection.*



let count = AtomicInt64(0)


main()
{
    let list = ArrayList<Future<Int64>>()

    for (_ in 0..1000) 
    {
        let fut = spawn {=>
            sleep(Duration.millisecond)
            //var temp = count.load()
            //while(!count.compareAndSwap(temp,temp+1)) {temp = count.load()}
            count.fetchAdd(1)
        }
        list.append(fut)
    }

    for (f in list) {f.get()}

    let val = count.load()
    println("count = ${val}")
}

// Output: 
// count = 1000