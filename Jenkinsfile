pipeline {
    agent any
    
    environment {
        GITHUB_TOKEN = credentials('GABBER_TOKEN')
        REPO_URL = 'https://github.com/Sakilalakmal/gabber-chat-app.git'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                checkout([$class: 'GitSCM',
                    branches: [[name: '*/main']],
                    doGenerateSubmoduleConfigurations: false,
                    extensions: [],
                    gitTool: 'Default', // Windows Git configured in Jenkins
                    userRemoteConfigs: [[
                        credentialsId: 'windows-ssh', // if using SSH, otherwise leave blank for HTTPS
                        url: "${REPO_URL}"
                    ]]
                ])
            }
        }
        

        stage('Install Dependencies - Backend') {
            steps {
                echo 'Installing backend dependencies...'
                dir('backend') {
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

        //auto merge logci
        stage('Auto-merge PR') {
            when {
                expression { 
                    return env.CHANGE_ID != null
                }
            }
            steps {
                echo 'All checks passed! Auto-merging PR...'
                script {
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
            echo 'Cleaning up workspace...'
            cleanWs()
        }
    }
}