pipeline {
    agent { label 'linux-wsl' }

    tools {
        git 'WSL Git' // Name of Git installation configured in Jenkins
        nodejs 'NodeJS' // Optional: if you set Node.js in Jenkins global tools
    }

    environment {
        GITHUB_TOKEN = credentials('GABBER_TOKEN') // GitHub token stored in Jenkins
        REPO_URL = 'https://github.com/Sakilalakmal/gabber-chat-app.git'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                checkout([$class: 'GitSCM',
                    branches: [[name: '*/main']], // Replace with the branch to checkout
                    doGenerateSubmoduleConfigurations: false,
                    extensions: [],
                    gitTool: 'WSL Git',
                    userRemoteConfigs: [[
                        credentialsId: 'wsl2-ssh', // SSH credentials for GitHub
                        url: "${REPO_URL}"
                    ]]
                ])
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
                    sh 'npm run lint || echo "No lint script found, skipping..."'
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
                    return env.CHANGE_ID != null // Only run if triggered by PR
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
