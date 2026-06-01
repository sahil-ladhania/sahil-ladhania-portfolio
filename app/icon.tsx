import { ImageResponse } from "next/og";

import { SiteIconMarkup } from "@/lib/site-icon-markup";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default function Icon(): ImageResponse {
  return new ImageResponse(<SiteIconMarkup size={512} />, {
    width: 512,
    height: 512,
  });
}
