URL checked: https://evanbaker315.github.io/personalWebsite/
When: 2026-09-22 19:45 MDT (2026-09-23 01:45 UTC)
What would have made this fail: the repo deploys to a subpath, so if the build had run without NEXT_PUBLIC_BASE_PATH=/personalWebsite, every /_next/ asset and every article link would have pointed at the domain root and 404'd. The page would have loaded as unstyled text. I checked the CSS chunk and all three article URLs directly, not just the homepage, and all returned 200.
