# Robot Behavior Test Guide

## Test the Fixed Robot in Pillars Section

1. **Open the application**: http://localhost:5176/

2. **Navigate to the "Key pillars of success" section** (Section 2)
   - This is the section with 5 pillar images showing the 10X mindset

3. **Test the robot behavior**:
   
   ### Initial Appearance
   - Wait for 10 seconds while viewing the pillars section
   - The robot should appear in the **bottom-right corner of your viewport** (not the section)
   
   ### Scroll Behavior
   - When you scroll within the pillars section, the robot should **disappear**
   - Stop scrolling and wait 3 seconds
   - The robot should **reappear** in the fixed position
   
   ### Position Test
   - Scroll to different parts of the pillars section
   - The robot should always appear in the **same viewport position** (bottom-right corner)
   - It should NOT move with the content like in other sections
   
   ### Section Exit/Enter
   - Scroll out of the pillars section
   - The robot should disappear
   - Scroll back into the pillars section
   - After stopping scroll for 3 seconds, the robot should reappear

4. **Compare with other sections**:
   - In other sections (Hero, Challenges, etc.), the robot is positioned relative to the section
   - Only in the Pillars section should it be fixed to the viewport

## Expected Behavior Summary

✅ Robot appears after 10 seconds in pillars section
✅ Robot is fixed to viewport (bottom-right), not section
✅ Robot hides during scrolling
✅ Robot reappears 3 seconds after scrolling stops
✅ Robot only visible when pillars section is in view
✅ Clicking robot opens the modal as expected