import std.collection.*

main() {
    
    // Range<T>(start: T, end: T, step: Int64, hasStart: Bool, hasEnd: Bool, isClosed: Bool)

    let r1 = Range<Int64>(0, 10, 1, true, true, true) // r1 contains 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    let r2 = Range<Int64>(0, 10, 1, true, true, false) // r2 contains 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
    let r3 = Range<Int64>(10, 0, -2, true, true, false) // r3 contains 10, 8, 6, 4, 2

    let n = 10
    let re1 = 0..10 : 1   // r1 contains 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
    let re2 = 0..=n : 1   // r2 contains 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    let re3 = n..0 : -2   // r3 contains 10, 8, 6, 4, 2
    let re4 = 10..=0 : -2 // r4 contains 10, 8, 6, 4, 2, 0

    let re5 = 10..0 : 1


    var it = re5.iterator()
    while (let Some(i) <- it.next()) {
        println(i)
    }

}