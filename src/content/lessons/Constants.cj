import std.math.*

let s: String = "constant"

main(){
    println(s)

    let n: Int64 = 500000000 // Type definition is not necessary here as it can be inferred

    let d = 3e20 / Float64(n) //Statically typed, need to cast int to float for interoperability

    println("${n} ${d}")

    println(sin(Float64(n))) //sin doesn't work with Int

    
}

