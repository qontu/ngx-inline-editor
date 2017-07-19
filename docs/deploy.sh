#!/usr/bin/env bash

yarn docs:build
(
    cd $DOCS_BUILDED_FOLDER
    if [ -d ".git" ]; then
        rm -rf .git
    fi
    git init
    git remote add origin git@github.com:xxxtonixxx/ngx-inline-editor.git
    git checkout -b gh-pages
    git add .
    git commit -m "docs"
    git push -f origin gh-pages:gh-pages
)
yarn docs:clean
