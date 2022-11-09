/**
 *
 * @param {number} num
 * @param {boolean} replaceIntEnd
 * @returns
 */
function numberFormat(num, replaceIntEnd = true) {
  if (typeof num !== "number") {
    num = Number(num);
  }

  let n = num.toFixed(2);

  if (replaceIntEnd) {
    n = n.replace(".00", "");
  }

  return n.replace(/.+?(?=\D|$)/, function (f) {
    return f.replace(/(\d)(?=(?:\d\d\d)+$)/g, "$1 ");
  });
}

/**
 *
 * @param {number} value1
 * @param {number} value2
 * @param {number} amount
 * @returns {number}
 */
function lerp(value1, value2, amount) {
  amount = amount < 0 ? 0 : amount;
  amount = amount > 1 ? 1 : amount;

  return value1 + (value2 - value1) * amount;
}

/**
 *
 * @param {number} start
 * @param {number} end
 * @param {number} current
 * @returns
 */
function lerpTime(start, end, current = Date.now()) {
  const cnt = current - start;

  return Math.max(0, Math.min(1, cnt / (end - start)));
}
/**
 *
 * @param {string} dict
 * @param {string} name
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {number} heading
 * @param {number} red
 * @param {number} green
 * @param {number} blue
 * @param {number} alpha
 */
function _DrawSprite(
  dict,
  name,
  x,
  y,
  width,
  height,
  heading = 0,
  red = 255,
  green = 255,
  blue = 255,
  alpha = 255
) {
  if (!HasStreamedTextureDictLoaded(dict)) {
    RequestStreamedTextureDict(dict, true);
  } else {
    DrawSprite(
      dict,
      name,
      x,
      y,
      width,
      height,
      heading,
      red,
      green,
      blue,
      alpha
    );
  }
}

/**
 *
 * @param {string} text
 * @param {number} xPos
 * @param {number} yPos
 * @param {number | [number, number]} scale
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @param {number} a
 * @param {number} justify
 * @param {boolean} shadow
 * @param {boolean} outline
 * @returns
 */
function drawText(
  text,
  xPos,
  yPos,
  scale = 0.2,
  r = 255,
  g = 255,
  b = 255,
  a = 255,
  /** middle, 2 - Right, 3 - Left */
  justify = 1,
  shadow = false,
  outline = false
) {
  if (!IsHudComponentActive(0)) {
    return false;
  }

  if (typeof scale === "number") {
    SetTextScale(1, scale);
  } else {
    SetTextScale(scale[0], scale[1]);
  }

  SetTextColour(r, g, b, a);

  if (shadow) {
    SetTextDropShadow();
  }

  if (outline) {
    SetTextOutline();
  }

  switch (justify) {
    case 1:
      SetTextCentre(true);
      break;

    case 2:
      SetTextRightJustify(true);
      SetTextWrap(0, xPos);
      break;

    case 3:
      SetTextJustification(1);
      // SetTextWrap(0, xPos);
      break;
  }

  SetTextEntry("STRING");
  AddTextComponentSubstringPlayerName(text);
  DrawText(xPos, yPos);
}

/**
 *
 * @param {number} amount
 * @param {'rp' | 'cash' | 'ammo'} type
 * @param {number} ms
 * @param {number} target
 */
const showRP_underhead = (
  amount,
  type = "rp",
  ms = 1500,
  target = GetPlayerPed(-1)
) => {
  const start = Date.now();
  const end = start + ms;
  const [resX, resY] = GetScreenActiveResolution();

  const tick = setTick(() => {
    const value = lerpTime(start, end);

    if (value >= 1) {
      clearTick(tick);
    }

    const pos = GetOffsetFromEntityInWorldCoords(
      target,
      0.0,
      0.0,
      0.8 + lerp(0.0, 0.15, value)
    );

    const [onScreen, x, y] = World3dToScreen2d(pos[0], pos[1], pos[2]);
    const h = 32 / resY;

    const name = `mp_anim_${type}`;

    if (onScreen) {
      const alpha = 255;

      _DrawSprite("mphud", name, x, y, 32 / resX, h, 0, 255, 255, 255, alpha);

      drawText(
        `<b>+${numberFormat(amount)}</b>`,
        x,
        y + h / 2,
        0.2,
        255,
        255,
        255,
        alpha
      );
    }
  });
};

on("showIconUnderhead", (amount, type, ms, target) => {
  showRP_underhead(amount, type, ms, target);
});

function getEntityFromNetworkIdFast(netId) {
  return NetworkDoesEntityExistWithNetworkId(netId)
    ? NetworkGetEntityFromNetworkId(netId)
    : null;
}

onNet("showIconUnderheadServer", (amount, type, ms, targetNet) => {
  const ped = targetNet
    ? getEntityFromNetworkIdFast(targetNet)
    : GetPlayerPed(-1);
  if (ped) showRP_underhead(amount, type, ms, ped);
});
