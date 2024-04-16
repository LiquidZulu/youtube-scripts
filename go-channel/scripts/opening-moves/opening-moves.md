
# Table of Contents

1.  [Recap](#orgd652ce9)
2.  [3x3](#orgfe32dfb)
3.  [3x4](#orgef1c601)
4.  [4x4](#orge859006)



<a id="orgd652ce9"></a>

# Recap

We are going to apply the four fundamental principles of Go to evaluate the efficacy of different potential openings we may choose. First, a recap on those principles:

1.  board priority&#x2014;play corners, then walls, then middle
2.  line height&#x2014;focus your efforts on placing stones on the ground before you dig in deep or go off into space
3.  speed vs strength&#x2014;you want to play fast, but not so fast that it becomes easy to invade you.
4.  life and death&#x2014;two eyes makes life


<a id="orgfe32dfb"></a>

# 3x3

Lets directly apply the first two principles, we want to get the corner first, but we also want to play on the ground, the 3x3 opening satisfies both of these conditions. We can see that this black stone is on the ground along both walls, and it will therefore very effectively be able to protect its corner. How should white respond to this? Should they try and play right up next to black to keep him contained? Lets try that and see what happens. No matter how close white pushes, black can easily expand out in the other direction, and white has no way to keep up with him, if white just carried this along right down the board, black would end up gaining the entire wall, which is not good for white, considering how white has done nothing similar&#x2014;black can easily invade.

So what if white instead simply mirrors blacks play and tries to get corners of his own?  Let&rsquo;s see what happens. We now have each player controlling two corners, they are on even footing, so what should black do now? We know that he wants to play along a wall, but which wall? The solution to this is a decision which should be based in principle three; speed vs strength. If black plays like this [black stone on like k17 or something] he is aiming at quite a lot of territory, whereas if he plays like this [black stone connecting between corners] he is more secure in his holding of the wall, not to mention that he has helped to potentially connect up his two corner stones. There are no right or wrong moves, you have to make your own strategic estimation of what you think will gain you more territory overall, so just keep your principles close to heart.


<a id="orgef1c601"></a>

# 3x4

What if black plays like this? Let&rsquo;s use our principles to evaluate what black is telling us with this move. He is down on the ground to one wall but up in the air towards the other, this is a signal that he really wants to keep that wall that he is close to and he expects to perhaps fall down towards the other wall. As it stands the 3x4 black opening stone needs extra work to be done to get the top wall, we say that black needs to play an enclosure&#x2014;meaning that he needs to play another stone to fully enclose the corner.

Let&rsquo;s evaluate some different enclosures,<sup><a id="fnr.1" class="footref" href="#fn.1" role="doc-backlink">1</a></sup> [3x4 5x3] this is the 3x4 5x3 enclosure, also known as the small knights enclosure, as it makes the same shape that a knight makes in chess. For the evaluation here, it is useful to bring up an analogy to particle physics, as two stones become closer and closer there is some sort of a force between them, that makes them essentially connected when they get close enough. Let&rsquo;s see this in action by imagining that white wants to cut these two black stones apart, how can he do this? [white sitting on the small arm of the L] If he plays here, black can simply block and white is stuck on the outside of a wall, black maintains his control of the corner. [White sitting just above the small arm of the L] White plays here, same story, black can block him and he has no where to poke through. What if white goes a completely different route and tries to undermine black? [just underground to long arm] Here, black can easily refute this move by blocking, [white in the bedrock in kight to black L long arm] here is the same deal, black can block him. [White in bedrock in line with L long arm] even if white goes right underneath the long arm of the black stone black can trivially block. We see that the small knights enclosure is very strong and assuming proper play from black it cannot be invaded by white.

Now we look at the faster version of this enclosure&#x2014;the large knights enclosure. We already know that white will not successfully undermine, but maybe now that the black stones are further apart black will not be able to close the gap, lets try that now. So, it seems that white is able to cut these stones apart, but to what end we may ask? White didnt get any corner territory, and he still must contest with the long arm of black to fight for the wall territory, has white really gained anything here? It would seem not, this means we have found another strong enclosure for black. In fact, AlphaGo very much favours this enclosure over the small knights enclosure,<sup><a id="fnr.2" class="footref" href="#fn.2" role="doc-backlink">2</a></sup> in contra-distinction to professional human players of the past.


<a id="orge859006"></a>

# 4x4

The 4x4 point is known as the corner star point,<sup><a id="fnr.3" class="footref" href="#fn.3" role="doc-backlink">3</a></sup> and it is marked by a bold dot. To quote Sensei&rsquo;s Library:<sup><a id="fnr.4" class="footref" href="#fn.4" role="doc-backlink">4</a></sup>

> A stone on the 4-4 point strikes a balance between influencing the center and defending the corner. It isn&rsquo;t as secure, territorially, as any of the moves mentioned above (though the 3-5 is biased towards the side, rather than the corner).
> 
> One could say the 4-4 point doesn&rsquo;t defend the corner at all, rather it defends the center and sides from the corner. To illustrate, an unsupported 3-3 invasion under the star point inevitably takes the corner, but gets sealed in on all sides.

Therefore, similarly to the 3x4 opening, this move requires extra work to enclose the corner but because it is in the sky along both walls black needs two moves, not one, to fully enclose this corner. We can re-apply our knowledge of the knights enclosures to see that they should work just fine, in both directions in fact, but there is an alternative choice of note for our second enclosing stone, and that is on the 3x5 point. This is somewhat slower in the direction that you choose, but it is useful in preventing a knights approach from white, this move is known as a kick, and it prevents white from jumping behind blacks lines of defense. This kick move is more relevant here because black gives white extra time to mount an attack, due to the requirement to make two enclosures.


# Footnotes

<sup><a id="fn.1" href="#fnr.1">1</a></sup> See, <https://senseis.xmp.net/?Enclosure> ([archived](https://archive.ph/9PaTw)), for more on enclosure theory.

<sup><a id="fn.2" href="#fnr.2">2</a></sup> <https://senseis.xmp.net/?3463Enclosure> ([archived](https://archive.ph/471zt))

<sup><a id="fn.3" href="#fnr.3">3</a></sup> See, <https://senseis.xmp.net/?StarPoint> ([archived](https://archive.ph/nxFLp))

<sup><a id="fn.4" href="#fnr.4">4</a></sup> <https://senseis.xmp.net/?44Point> ([archived](https://archive.ph/X24TE#selection-179.0-187.138))
