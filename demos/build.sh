#!/usr/bin/env bash

validate_it_is_at_root_dir() {
  if [ ! -d ./.git ]; then
    echo "To run this script, you need to be at the root directory of the repository"
    exit 1
  fi
}

validate_no_uncommited_changes() {
  if [[ -n $(git status -s) ]]; then
    echo "To run this script, you must not have uncommited changes"
    exit 1
  fi
}

setup_examples() {
  # copy the `demos` dir from the `master` branch
  # but do not track it with git
  git checkout master -- demos && git reset

  rm -rf ./examples && mkdir examples

  cd ./demos

  for DEMO_DIR in * ; do if [ -d "$DEMO_DIR" ]; then
    cd "$DEMO_DIR"

    # for speed, expect that the node_modules are up to date
    # if the directory is present
    if [ ! -d node_modules ]; then
      echo "Installing npm modules of $DEMO_DIR"
      npm i
    fi

    # expect by default that it is using angular-cli
    # build dev version until minified version
    # of demos/angular2-data-table2 is broken
    ./node_modules/.bin/ng build --dev

    # update the base href of the repo
    sed -i.tmp "s|<base href=\"/\">|<base href=\"/ng2-inline-editor/examples/$DEMO_DIR/\">|" \
      dist/index.html && rm -f dist/index.html.tmp

    cp -r dist ../../examples/"$DEMO_DIR"
    cd ..
  fi done

  cd ..
}

create_index_HTML_file() {
  rm -f index.html && cat > index.html << EOL
  <html>
  <head>
      <meta charset="UTF-8">
      <title>ng2-inline-editor</title>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  </head>
  <body>
      <div class="col-sm-10 col-sm-offset-1">
        <div class="page-header">
          <h1>ng2-inline-editor</h1>
        </div>
        <h2>Demos:</h2>
        <ul>
EOL

  cd examples
  for EXAMPLE_DIR in * ; do if [ -d "$EXAMPLE_DIR" ]; then
    echo "          <li><a href=\"examples/$EXAMPLE_DIR\">$EXAMPLE_DIR</a></li>" >> ../index.html
  fi done
  cd ..

  cat >> index.html << EOL
        </ul>
      </div>
  </body>
  </html>
EOL
}

commit_changes_and_exit() {
  if [[ -n $(git status -s) ]]; then
    MASTER_COMMIT_START=$(git rev-parse master | head -c 10)
    git add -A . && git commit -m "Generate examples of $MASTER_COMMIT_START"
    echo "The new examples generated were commited. Please run:"
    echo "git push origin gh-pages"
  else
    echo "The result of the examples is the same as before. Not committing"
  fi

  git checkout master

  exit 0
}

validate_it_is_at_root_dir

validate_no_uncommited_changes

git checkout gh-pages

echo "Generating the examples directory using the demos in the 'gh-pages' branch"

setup_examples

create_index_HTML_file

commit_changes_and_exit
