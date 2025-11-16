// Student Personality Assessment Application
class PersonalityAssessment {
    constructor() {
        this.currentQuestion = 0;
        this.answers = {};
        this.studentInfo = {};
        this.chart = null;

        this.initializeElements();
        this.attachEventListeners();
    }

    initializeElements() {
        // Screens
        this.welcomeScreen = document.getElementById('welcome-screen');
        this.infoScreen = document.getElementById('info-screen');
        this.quizScreen = document.getElementById('quiz-screen');
        this.resultsScreen = document.getElementById('results-screen');

        // Buttons
        this.startBtn = document.getElementById('start-btn');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.downloadBtn = document.getElementById('download-btn');
        this.retakeBtn = document.getElementById('retake-btn');

        // Form
        this.studentInfoForm = document.getElementById('student-info-form');

        // Quiz elements
        this.progressFill = document.getElementById('progress-fill');
        this.progressText = document.getElementById('progress-text');
        this.traitIndicator = document.getElementById('trait-indicator');
        this.questionText = document.getElementById('question-text');
        this.scaleOptions = document.getElementById('scale-options');
        this.scaleBtns = document.querySelectorAll('.scale-btn');

        // Results elements
        this.studentGreeting = document.getElementById('student-greeting');
        this.traitResults = document.getElementById('trait-results');
    }

    attachEventListeners() {
        this.startBtn.addEventListener('click', () => this.showScreen('info'));

        this.studentInfoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveStudentInfo();
            this.showScreen('quiz');
            this.displayQuestion();
        });

        this.scaleBtns.forEach(btn => {
            btn.addEventListener('click', () => this.selectAnswer(btn));
        });

        this.prevBtn.addEventListener('click', () => this.previousQuestion());
        this.nextBtn.addEventListener('click', () => this.nextQuestion());

        this.downloadBtn.addEventListener('click', () => this.downloadResults());
        this.retakeBtn.addEventListener('click', () => this.retakeAssessment());
    }

    showScreen(screenName) {
        // Hide all screens
        [this.welcomeScreen, this.infoScreen, this.quizScreen, this.resultsScreen]
            .forEach(screen => screen.classList.remove('active'));

        // Show selected screen
        switch(screenName) {
            case 'welcome':
                this.welcomeScreen.classList.add('active');
                break;
            case 'info':
                this.infoScreen.classList.add('active');
                break;
            case 'quiz':
                this.quizScreen.classList.add('active');
                break;
            case 'results':
                this.resultsScreen.classList.add('active');
                break;
        }
    }

    saveStudentInfo() {
        this.studentInfo = {
            name: document.getElementById('student-name').value || 'Student',
            age: document.getElementById('student-age').value || ''
        };
    }

    displayQuestion() {
        const question = questions[this.currentQuestion];

        // Update progress
        const progress = ((this.currentQuestion + 1) / questions.length) * 100;
        this.progressFill.style.width = `${progress}%`;
        this.progressText.textContent = `Question ${this.currentQuestion + 1} of ${questions.length}`;

        // Update trait indicator
        const traitName = traitInfo[question.trait].name;
        this.traitIndicator.textContent = traitName;

        // Update question text
        this.questionText.textContent = question.text;

        // Reset scale buttons
        this.scaleBtns.forEach(btn => btn.classList.remove('selected'));

        // If already answered, show the selected answer
        if (this.answers[question.id]) {
            const selectedBtn = document.querySelector(`.scale-btn[data-value="${this.answers[question.id]}"]`);
            if (selectedBtn) {
                selectedBtn.classList.add('selected');
            }
        }

        // Update navigation buttons
        this.prevBtn.disabled = this.currentQuestion === 0;
        this.nextBtn.disabled = !this.answers[question.id];
        this.nextBtn.textContent = this.currentQuestion === questions.length - 1 ? 'See Results' : 'Next';
    }

    selectAnswer(btn) {
        const value = parseInt(btn.dataset.value);
        const question = questions[this.currentQuestion];

        // Store answer
        this.answers[question.id] = value;

        // Update UI
        this.scaleBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');

        // Enable next button
        this.nextBtn.disabled = false;
    }

    previousQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.displayQuestion();
        }
    }

    nextQuestion() {
        if (this.currentQuestion < questions.length - 1) {
            this.currentQuestion++;
            this.displayQuestion();
        } else {
            // All questions answered, show results
            this.calculateResults();
        }
    }

    calculateResults() {
        const scores = {
            openness: { total: 0, count: 0 },
            conscientiousness: { total: 0, count: 0 },
            extraversion: { total: 0, count: 0 },
            agreeableness: { total: 0, count: 0 },
            neuroticism: { total: 0, count: 0 }
        };

        // Calculate scores for each trait
        questions.forEach(question => {
            const answer = this.answers[question.id];
            if (answer) {
                // Apply reverse scoring if needed
                const score = question.reverse ? (6 - answer) : answer;
                scores[question.trait].total += score;
                scores[question.trait].count++;
            }
        });

        // Convert to percentages (1-5 scale to 0-100%)
        this.results = {};
        Object.keys(scores).forEach(trait => {
            const avgScore = scores[trait].total / scores[trait].count;
            // Convert 1-5 scale to percentage (1=0%, 3=50%, 5=100%)
            this.results[trait] = ((avgScore - 1) / 4) * 100;
        });

        this.displayResults();
    }

    displayResults() {
        // Update greeting
        let greeting = `Great job, ${this.studentInfo.name}!`;
        if (this.studentInfo.age) {
            greeting += ` At ${this.studentInfo.age} years old`;
        }
        greeting += ', here is your personality profile:';
        this.studentGreeting.textContent = greeting;

        // Create chart
        this.createChart();

        // Display detailed results
        this.displayTraitResults();

        // Show results screen
        this.showScreen('results');
    }

    createChart() {
        const ctx = document.getElementById('personality-chart').getContext('2d');

        if (this.chart) {
            this.chart.destroy();
        }

        this.chart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: [
                    'Openness',
                    'Conscientiousness',
                    'Extraversion',
                    'Agreeableness',
                    'Neuroticism'
                ],
                datasets: [{
                    label: 'Your Personality Profile',
                    data: [
                        this.results.openness,
                        this.results.conscientiousness,
                        this.results.extraversion,
                        this.results.agreeableness,
                        this.results.neuroticism
                    ],
                    backgroundColor: 'rgba(17, 153, 142, 0.2)',
                    borderColor: '#11998e',
                    borderWidth: 3,
                    pointBackgroundColor: '#11998e',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#11998e',
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        min: 0,
                        ticks: {
                            stepSize: 20,
                            font: {
                                size: 12
                            }
                        },
                        pointLabels: {
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            font: {
                                size: 14
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.raw.toFixed(1)}%`;
                            }
                        }
                    }
                }
            }
        });
    }

    displayTraitResults() {
        this.traitResults.innerHTML = '';

        const traits = ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism'];

        traits.forEach(trait => {
            const score = this.results[trait];
            const info = traitInfo[trait];

            let description;
            if (score >= 70) {
                description = info.highDescription;
            } else if (score <= 30) {
                description = info.lowDescription;
            } else {
                description = info.moderateDescription;
            }

            const traitHtml = `
                <div class="trait-result ${trait}">
                    <h4>${info.name}</h4>
                    <div class="trait-score">${score.toFixed(1)}%</div>
                    <div class="score-bar">
                        <div class="score-fill ${trait}" style="width: ${score}%"></div>
                    </div>
                    <p class="trait-description">${description}</p>
                </div>
            `;

            this.traitResults.innerHTML += traitHtml;
        });
    }

    downloadResults() {
        // Create a text summary of results
        let summary = `BIG FIVE PERSONALITY ASSESSMENT RESULTS\n`;
        summary += `========================================\n\n`;
        summary += `Student: ${this.studentInfo.name}\n`;
        if (this.studentInfo.age) summary += `Age: ${this.studentInfo.age}\n`;
        summary += `Date: ${new Date().toLocaleDateString()}\n\n`;
        summary += `PERSONALITY SCORES\n`;
        summary += `------------------\n\n`;

        const traits = ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism'];

        traits.forEach(trait => {
            const score = this.results[trait];
            const info = traitInfo[trait];
            let level = score >= 70 ? 'High' : score <= 30 ? 'Low' : 'Moderate';
            let description = score >= 70 ? info.highDescription : score <= 30 ? info.lowDescription : info.moderateDescription;

            summary += `${info.name}\n`;
            summary += `Score: ${score.toFixed(1)}% (${level})\n`;
            summary += `${description}\n\n`;
        });

        summary += `\n========================================\n`;
        summary += `This assessment is for educational purposes only.\n`;
        summary += `Based on the OCEAN model of personality psychology.\n`;

        // Create download link
        const blob = new Blob([summary], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `personality-results-${this.studentInfo.name.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    retakeAssessment() {
        // Reset state
        this.currentQuestion = 0;
        this.answers = {};

        // Clear form
        document.getElementById('student-name').value = '';
        document.getElementById('student-age').value = '';

        // Show welcome screen
        this.showScreen('welcome');
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new PersonalityAssessment();
});
