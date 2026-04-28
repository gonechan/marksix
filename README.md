# 🎰 Mark Six Lottery Drawer

A simple, elegant web application for generating random non-repeating integer draws. Perfect for lottery simulations, raffles, or any scenario requiring random number selection.

## Features

✨ **Core Features**
- Generate multiple independent lottery draws
- Configure custom number ranges
- Specify how many numbers per draw
- Ensure no repeating numbers within a draw
- Support for banker entries (fixed numbers that appear in every draw)

🎯 **User Experience**
- Clean, intuitive interface
- Real-time input validation
- Beautiful colored number balls for visualization
- Responsive design works on desktop and mobile
- Error messages guide users to fix issues

⚡ **Performance**
- Pure JavaScript - no dependencies
- Efficient Fisher-Yates algorithm for random selection
- Instant draw generation even for large batches

## How to Use

### 1. **Basic Setup**
   - Set your number range (Min and Max)
   - Choose how many draws you want
   - Specify how many numbers per draw

### 2. **Generate Draws**
   - Click "Generate Draws"
   - View your random number sets displayed as colored balls

### 3. **Banker Entries (Optional)**
   - Check "Use Banker Entries"
   - Enter fixed numbers (comma-separated, e.g., `7,14,21`)
   - These numbers will appear in every draw
   - Shown in red on the result display

## Example Scenarios

### Traditional Mark Six
```
Range: 1-49
Draws: 10
Numbers per draw: 6
```

### Raffle with Banker
```
Range: 1-100
Draws: 5
Numbers per draw: 4
Banker: 99 (lucky number always included)
```

### Large Batch Drawing
```
Range: 1-1000
Draws: 50
Numbers per draw: 10
```

## Technical Details

### Algorithm
- Uses **Fisher-Yates shuffle** for unbiased random selection
- Ensures no duplicates within each draw
- O(n) time complexity for generation

### Validation
- Input range validation
- Draw count limits (1-100)
- Banker number compatibility checking
- Available number sufficiency verification

### Browser Compatibility
- Works in all modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive CSS for mobile and tablet devices
- No build process or external dependencies required

## Deployment

This is a **static GitHub Pages site** - no backend needed!

### Enable GitHub Pages:
1. Go to your repository Settings
2. Navigate to **Pages** section
3. Select `main` branch as source
4. Save

Your site will be live at: `https://<username>.github.io/marksix`

## File Structure

```
marksix/
├── index.html       # Main HTML interface
├── styles.css       # Responsive styling
├── app.js          # Core JavaScript logic
├── README.md       # This file
└── .gitignore      # Git ignore rules
```

## Customization

### Modify Colors
Edit `styles.css` gradient colors:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Adjust Limits
Edit `index.html` form constraints:
```html
<input type="number" id="drawCount" max="100">
```

### Change Number Ball Style
Modify `.number-ball` class in `styles.css`

## License

Free to use and modify

## Support

For issues or suggestions, create an issue in the repository.

---

**Made with ❤️ for lottery enthusiasts**
