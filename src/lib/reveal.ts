/**
 * Spread onto an element to fade/slide it in when it scrolls into view.
 *   <li {...rv(i)}>            – rises, staggered by index
 *   <div {...rv(0, 'start')}>  – slides in from the reading-start side ('end', 'fade', 'pop' also work)
 */
export const rv = (index = 0, kind = '') => ({
  'data-reveal': kind,
  style: `--i:${index}`,
});
