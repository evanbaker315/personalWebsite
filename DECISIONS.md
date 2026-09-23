# Decision log

Your methods section. About one page total.

Answer these as you go, not the night before it is due.
Specifics beat polish - a short honest answer is worth more than a long vague one.

Delete these instructions when you are done, or leave them. It does not matter.

---

## 1. What did you set out to build, and what changed?


I set out to build a site that shows what I am building and how I think about things. My first goal was to
hit the course requirments, and secondly to build a website people can go to if they want to learn more about me. 
I intentionally kept the design of the website plain, as the goal of it is to quickly allow potential collaborators
or investors on my projects to get information quickly, and know that I am someone who takes function, operations,
and engineering seriously. Some things that changed along the way were that I added the little scroll animation to the right
side of the screen to make the site a bit more interesting.  I also added it so that if you hover on a link there is a little
animation. I added these things because the site felt somewhat bland, so I tried to find some ways to keep it  simple
yet also add excitement. Another thing I did to make it more interesting was adding the screenshot from my apps, this added
some more interesting visuals for a user to look at.



## 2. A fork in the road

Name one real choice where you could have gone two ways.
Plain HTML or a framework. One page or several. Your own CSS or someone's template.
What goes on the front page and what does not.

Say which you picked, what the alternative was, and what you gave up by not taking it.

"There was no alternative" is not an answer. Find the fork.

One fork that I chose was to go with Next.js. Even though for this project I wanted to keep the 
site simple and basic HTML/CSS may have been easier. At some point I may want to change my website for marketing.
If I do this, I may want to make it cooler. And choosing next js will give me a lot more ability to extend the site in the 
future and add in the features I may want. 


Another fork I had was changing from building the site with one claude window. To using a team of agents to do it. 
I split the agents into builders and reviwers, so that the agents checking the work are not the ones
who wrote it. This helps ensure agents are critical when reviewing the websites look and content. 


## 3. Where you overruled the agent

One time Claude suggested, wrote, or claimed something and you did not take it.

What did it do? How did you notice? What did you do instead?

If it genuinely never happened, say so plainly, and then say what you would have had to
check in order to notice. Being honest here costs you far less than a story you cannot
defend when you record your video.

*Your answer here.*
I overruled the agent in a couple of places. Firstly, I overruled it on the colors. At first I wanted a black and white website 
with brown and navy accents. However, the site it orignally made was way to heavy on the brown and navy. So I overwrote its styling rules around coloring to make the website better hit the asthetic that I wanted. 

The second time I overruled it was the scroll rail. The agent built a big black band under the hero with
a four station diagram in it and defended the design in its code comments. I scrolled the
actual build and it was useless. The band scrolls away, so you never see the marker move,
and the four stations did not match anything on the page. So I replaced it with the animation on the left. 



---

## 4. How you know it works

What check did you run, and what did it tell you?

Then the real question: **what would have made this check fail?**
A check that could not have failed is not a check.

Link to your `verification/` folder.


The main check I had the ai run is boring but necessary. My type scale is set with CSS `clamp()`. Write
`clamp(2.25rem, 1.2rem+4.5vw, 3.5rem)` without spaces around the `+` and it parses fine,
throws no error, then fails quietly. The heading just inherits its parent's size. If this fails the
page does not look broken just looks boring. So instead of eyeballing it I had the ai open the
exported site in a headless browser and checked the real computed font size of the h1
56px at 1440px, 36px at 375px and see if it passed. The same run also checks that nothing
sits outside the viewport at 375, 640 and 1440, and that no navy or brown resolves on the
black surface. It could have failed. A version of it did, on a diagram I had on the site that
I ended up replacing with the screenshots where the specified size read
15px but the rendered size was 13.88px because SVG text scales with its viewBox.

The last check on every change was me, on localhost, before anything stayed. That is how
the scroll rail got rebuilt twice and how I caught the brown and navy being too heavy.
The automated check tells you the CSS did what it says. It does not tell you the site is
any good to use.

Verification: [`verification/`](verification/). Live site:
[https://evanbaker315.github.io/personalWebsite/](https://evanbaker315.github.io/personalWebsite/).
The folder has the `curl -i` of that URL coming back 200, and a screenshot with the URL
bar showing so it is the live site and not my laptop.


---

## 5. What is still wrong

One thing on your own site that is not right, not finished, or that you do not
fully understand.

What would you do next, and how would you find out?

One thing on the site that I dont think if fully right is that it is still a little bland. I went pretty hard on the clean,
professional, and slightly premuim look. But because of this, I ended up making the site a little bit to boring. 
If I had more time to work I would focus on adding in a few more small animations, such as the side one I added in, and the ones on the 
links. 

Also, to find out what I should do next. I am really excited to read my fellow students comments on my website, and
implement some of the feedback that they give me. 
---
