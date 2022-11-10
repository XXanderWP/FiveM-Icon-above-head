## XanderWP Icon above the head system [Standalone]

A simple script that will allow you to display an icon with text above the player's head (or NPC)

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/J3J6G9HXM) [![Tebex](https://img.shields.io/badge/Tebex-Go%20to%20shop-blue?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAnklEQVQ4y2MUdZ7yn4GRgWzAxEAhoNgAFlTufwYtRREGZibsfvr77z/Dtftv8RnAwLCxL5CBn4cdqwEfv/xkUA2cg9+AlOYdDCwsEJ/1FzkxMDAwMBT27WNgYGBg+PPnHwMDw38GBqRQRzOAkeHguSdQ3/xn+P7jDwMDAwPD3lOPUNQMrlgYBgaw4JZiZEhp2UGBAYwMDJfvvBkCYQAALXMlXZSOhTgAAAAASUVORK5CYII=)](https://xander-fivem.tebex.io/) ![](https://dcbadge.vercel.app/api/shield/260317827288924161)

# Example

![](example.gif "Example")

# Use script example

`LUA`

```LUA
-- Client
local amount = 10
local iconType = 'rp' -- 'rp' | 'cash' | 'ammo'
local ms = 1500
local target = GetPlayerPed(-1)
TriggerEvent('showIconAbovehead', amount, iconType, ms, target)
```

`JavaScript`

```JS
// Client
const amount = 10
const iconType = 'rp' // 'rp' | 'cash' | 'ammo'
const ms = 1500
const target = GetPlayerPed(-1)
emit('showIconAbovehead', amount, iconType, ms, target)
```
