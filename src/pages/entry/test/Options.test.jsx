import { render, screen } from "@testing-library/react";

import Options from "../Options";

test("displays image for each scope option from server", () => {
  render(<Options optionType="scoops" />);

  //find images
  const scoopImages = screen.getAllByRole("image", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm all text of images
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocalate scoop", "Vanilla scoop"]);
});
