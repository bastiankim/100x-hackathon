# Sebastian Kim - Portfolio Website

A minimal, clean portfolio website inspired by yeezy.com's aesthetic. Built with HTML5, CSS3, and vanilla JavaScript for optimal performance and maintainability.

## 🚀 Features

- **Minimal Design**: Clean, spacious layout with lots of white space
- **Typography Focused**: Inter font family with light weights for elegance
- **Fully Responsive**: Optimized for all devices and screen sizes
- **Interactive Elements**: Subtle hover effects and smooth scrolling
- **Contact Form**: Functional contact form with validation
- **Performance Optimized**: Fast loading with minimal animations
- **SEO Friendly**: Semantic HTML structure
- **Cross-browser Compatible**: Works on all modern browsers

## 🎨 Design Philosophy

This portfolio follows the **less is more** principle:
- **Clean lines** and minimal borders
- **Generous white space** for breathing room
- **Light typography** (Inter 300 weight)
- **Subtle interactions** that don't distract
- **Monochromatic color scheme** (black, white, grays)
- **Grid-based layout** for consistency

## 📁 File Structure

```
portfolio-website/
├── index.html          # Main HTML file
├── styles.css          # Minimal CSS styles
├── script.js           # Simplified JavaScript
└── README.md           # This file
```

## 🎨 Customization Guide

### 1. Personal Information

Update the following sections in `index.html`:

- **Hero Section**: Change name, title, and description
- **About Section**: Update bio, skills, and statistics
- **Work Section**: Add your own projects with descriptions
- **Contact Information**: Update email, phone, and location

### 2. Colors and Theme

The website uses a minimal color scheme:

```css
/* Primary Colors */
--primary-color: #000000;
--secondary-color: #666666;

/* Background Colors */
--bg-primary: #ffffff;
--bg-secondary: #f8f8f8;
--bg-accent: #f0f0f0;

/* Text Colors */
--text-primary: #000000;
--text-secondary: #333333;
--text-light: #666666;
```

### 3. Adding Projects

To add a new project, duplicate the project card structure:

```html
<div class="project-card">
    <div class="project-image">
        <i class="fas fa-icon-name"></i>
    </div>
    <div class="project-content">
        <h3>Project Title</h3>
        <p>Project description goes here...</p>
        <div class="project-tech">
            <span>Technology 1</span>
            <span>Technology 2</span>
        </div>
        <div class="project-links">
            <a href="#" class="project-link">Live Demo</a>
            <a href="#" class="project-link">Code</a>
        </div>
    </div>
</div>
```

### 4. Skills and Technologies

Update the skills section in the About section:

```html
<div class="skill-tags">
    <span class="skill-tag">Your Skill 1</span>
    <span class="skill-tag">Your Skill 2</span>
    <span class="skill-tag">Your Skill 3</span>
</div>
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Minimal styling with Flexbox and Grid
- **JavaScript (ES6+)**: Essential interactive functionality
- **Font Awesome**: Minimal icon set
- **Google Fonts**: Inter font family (300 weight)

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: 480px - 767px
- **Small Mobile**: Below 480px

## 🚀 Getting Started

1. **Clone or Download**: Get the files to your local machine
2. **Customize Content**: Update the HTML with your information
3. **Modify Styles**: Adjust colors and layout in CSS
4. **Add Functionality**: Enhance JavaScript as needed
5. **Deploy**: Upload to your web hosting service

## 🌐 Deployment Options

### GitHub Pages
1. Create a new repository
2. Upload your files
3. Enable GitHub Pages in repository settings

### Netlify
1. Drag and drop your folder to Netlify
2. Get instant deployment with custom domain support

### Vercel
1. Connect your GitHub repository
2. Automatic deployments on every push

## 📧 Contact Form Setup

The contact form is currently set up with a simulated submission. To make it functional:

1. **Backend Service**: Use services like Formspree, Netlify Forms, or your own backend
2. **Email Service**: Integrate with SendGrid, Mailgun, or similar services
3. **Database**: Store submissions in a database if needed

Example with Formspree:
```html
<form class="contact-form" action="https://formspree.io/your-email@domain.com" method="POST">
    <!-- form fields -->
</form>
```

## 🎯 Performance Tips

- **Images**: Optimize and compress images before uploading
- **Fonts**: Consider using font-display: swap for better loading
- **JavaScript**: Minify JS files for production
- **CSS**: Minify CSS files for production
- **Caching**: Implement proper caching headers

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Internet Explorer 11+

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📞 Support

If you need help customizing or have questions, feel free to reach out!

---

**Built with minimal design principles**

*Inspired by yeezy.com's aesthetic* 