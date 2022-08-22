export const removeRoot = (elements) => {
  const { roots, arrows } = elements;

  roots.forEach((root) => root.remove());
  arrows.forEach((arrow) => arrow.remove());
};
