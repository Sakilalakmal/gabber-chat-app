pipeline {
    agent any
    
    environment {
        // Ensure this ID matches what you saved in Jenkins Credentials
        GITHUB_TOKEN = credentials('GABBER_TOKEN') 
        // We don't need REPO_URL anymore, Multibranch handles it
    }
    
    stages {
        // STAGE 1: REMOVED MANUAL CHECKOUT (Jenkins does this automatically now)

        stage('Install Dependencies - Backend') {
            steps {
                echo 'Installing backend dependencies...'
                dir('backend') {
                    // utilizing npm ci for cleaner installs in CI
                    bat 'npm ci'
                }
            }
        }
        
        stage('Install Dependencies - Frontend') {
            steps {
                echo 'Installing frontend dependencies...'
                dir('frontend') {
                    bat 'npx pnpm install --frozen-lockfile'
                }
            }
        }
        
        stage('Lint - Backend') {
            steps {
                echo 'Linting backend code...'
                dir('backend') {
                    bat 'npm run lint || echo No lint script found, skipping...'
                }
            }
        }
        
        stage('Lint - Frontend') {
            steps {
                echo 'Linting frontend code...'
                dir('frontend') {
                    bat 'npx pnpm run lint'
                }
            }
        }
        
        stage('Build - Frontend') {
            steps {
                echo 'Building frontend...'
                dir('frontend') {
                    bat 'npx pnpm run build'
                }
            }
        }

        stage('Auto-merge PR') {
            // Only run this stage if it is a Pull Request
            when {
                expression { 
                    return env.CHANGE_ID != null
                }
            }
            steps {
                echo "PR Detected: ${env.CHANGE_ID}. Attempting to merge..."
                script {
                    // Windows CURL command to merge
                    bat """
                        curl -X PUT ^
                        -H "Authorization: token %GITHUB_TOKEN%" ^
                        -H "Accept: application/vnd.github.v3+json" ^
                        https://api.github.com/repos/Sakilalakmal/gabber-chat-app/pulls/%CHANGE_ID%/merge ^
                        -d "{\\"commit_title\\":\\"Auto-merge PR #%CHANGE_ID%\\",\\"merge_method\\":\\"merge\\"}"
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
            cleanWs()
        }
    }
}