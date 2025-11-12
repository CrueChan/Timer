# Contributing to Timer

Thank you for your interest in contributing to the Timer project! We welcome all forms of contributions, whether it's bug reports, feature suggestions, or code improvements.

## Ways to Contribute

### 1. Report Bugs

If you encounter a bug, please create an issue with the following information:

- **Title**: Brief description of the bug
- **Environment**: Browser type, version, and OS
- **Steps to Reproduce**: Clear steps to reproduce the issue
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Screenshots**: If applicable, attach screenshots

### 2. Suggest Features

We're always open to new ideas! When suggesting a feature:

- Use a clear and descriptive title
- Provide a detailed description of the proposed feature
- Explain why this feature would be useful
- List any similar features in other applications (if applicable)

### 3. Submit Code

We welcome pull requests! Here's how to contribute code:

#### Setup

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/CrueChan/Timer.git
   ```
3. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

#### Development Guidelines

- Keep changes focused and atomic (one feature per pull request)
- Maintain the existing code style and formatting
- Test your changes across different browsers (Chrome, Firefox, Safari)
- Test on both desktop and mobile devices
- Keep the codebase clean—avoid adding unnecessary dependencies
- Write clear, descriptive commit messages

#### Making Changes

1. Make your changes to the code
2. Test thoroughly in your browser
3. Commit your changes with clear messages:
   ```bash
   git commit -m "Add: descriptive message of changes"
   ```
4. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a Pull Request on GitHub with:
   - Clear title and description
   - Reference to any related issues
   - Explanation of what you changed and why

#### Pull Request Guidelines

- Provide a clear description of your changes
- Reference any related issues using `#issue-number`
- Include before/after behavior descriptions
- Ensure all changes are tested
- Keep pull requests reasonably sized (avoid mega-PRs)

### 4. Documentation

Help improve our documentation:

- Fix typos or clarify unclear sections
- Add examples or use cases
- Translate documentation to other languages
- Improve code comments

## Code Style

### HTML/CSS
- Use semantic HTML5 elements
- Keep CSS organized and well-commented
- Use meaningful class and ID names
- Follow the existing indentation style (2 spaces)

### JavaScript
- Use consistent naming conventions (camelCase for variables/functions)
- Add comments for complex logic
- Keep functions focused and modular
- Avoid unnecessary global variables

## Commit Message Convention

Follow this format for commit messages:

```
Type: Brief description

Detailed explanation (if needed)

- Bullet points for specific changes
- If fixing an issue, reference it: Fixes #123
```

**Types**: Add, Fix, Improve, Refactor, Docs, Style, Test

Example:
```
Add: Keyboard shortcut support for start/stop (spacebar)

Implements keyboard shortcuts to improve accessibility:
- Space bar to toggle start/stop
- R key to reset timer
- Tested on Chrome, Firefox, Safari

Fixes #45
```

## Review Process

Once you submit a pull request:

1. We'll review your changes for functionality and code quality
2. We may request changes or ask questions
3. Once approved, we'll merge your pull request
4. Your contribution will be acknowledged in the changelog

## Community Standards

- Be respectful and professional in all interactions
- No harassment, discrimination, or hate speech
- Assume good intentions from others
- Help newer contributors learn and grow
- Give credit where credit is due

## Questions?

If you have questions or need clarification:

- Check existing issues and discussions first
- Create a new discussion or issue to ask your question
- Be specific and provide context

## Recognition

Contributors will be recognized in:
- The CHANGELOG.md file
- GitHub's contributors page
- Project documentation (if applicable)

Thank you for helping make Timer better! 🎉
