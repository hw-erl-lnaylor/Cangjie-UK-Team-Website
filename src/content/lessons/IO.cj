import std.console.*

main(){
    let s1 = Console.stdIn.readln() // reads full line
    let s2 = Console.stdIn.readUntil(r" ") // takes rune as input

    Console.stdOut.writeln(s1.getOrThrow()) 
    Console.stdOut.writeln(s2.getOrThrow())
    Console.stdOut.flush()
}