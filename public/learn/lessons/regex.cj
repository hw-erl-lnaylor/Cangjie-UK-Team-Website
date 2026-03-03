import std.regex.*


main()
{
    var a: String = """
        My name is Ali Lee, I intern at Edinburgh and 
        my email address is ali.Lee69@gmail.com.
        My cats name is zoe, and her email is zoe.iamacat@kitty.com.
    """

    var regex = Regex("[\\S]*@[\\S]*.[a-z]+") 






    var matcher = Matcher(regex,a)
    let number_of_matches = matcher.allCount()

    for(_ in 0..number_of_matches)
    {
        var help = matcher.find().getOrThrow().matchStr()
        println(help)
    }
}

// Output: 
// ali.Lee69@gmail.com
// zoe.iamacat@kitty.com