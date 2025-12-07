pipeline {
    agent {
        label 'linux-wsl'
    }
    
    environment {
        GITHUB_TOKEN = credentials('GABBER_TOKEN')
        REPO_URL = 'https://github.com/Sakilalakmal/gabber-chat-app.git'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                checkout scm
            }
        }
        
        stage('Install Dependencies - Backend') {
            steps {
                echo 'Installing backend dependencies...'
                dir('backend') {
                    sh 'npm ci'
                }
            }
        }
        
        stage('Install Dependencies - Frontend') {
            steps {
                echo 'Installing frontend dependencies...'
                dir('frontend') {
                    sh 'npm ci'
                }
            }
        }
        
        stage('Lint - Backend') {
            steps {
                echo 'Linting backend code...'
                dir('backend') {
                    sh 'npm run lint || echo "No lint script found, skipping..."'
                }
            }
        }
        
        stage('Lint - Frontend') {
            steps {
                echo 'Linting frontend code...'
                dir('frontend') {
                    sh 'npm run lint'
                }
            }
        }
        
        stage('Build - Frontend') {
            steps {
                echo 'Building frontend...'
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }
        
        stage('Auto-merge PR') {
            when {
                expression { 
                    return env.CHANGE_ID != null
                }
            }
            steps {
                echo 'All checks passed! Auto-merging PR...'
                script {
                    sh """
                        curl -X PUT \
                        -H "Authorization: token ${GITHUB_TOKEN}" \
                        -H "Accept: application/vnd.github.v3+json" \
                        https://api.github.com/repos/Sakilalakmal/gabber-chat-app/pulls/${env.CHANGE_ID}/merge \
                        -d '{"commit_title":"Auto-merge PR #${env.CHANGE_ID}","merge_method":"merge"}'
                    """
                }
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully! ✅'
        }
        failure {
            echo 'Pipeline failed! ❌'
        }
        cleanup {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
    }
}
