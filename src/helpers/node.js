/**
 * Get node index by parent
 * @param {HTMLElement} node 
 * @returns {number}
 */
const getNodeIndexRelativelyParent = (node) => {
  return Array.from(node.parentNode.children).indexOf(node);
}

module.exports = { getNodeIndexRelativelyParent }
