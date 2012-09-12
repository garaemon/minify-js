# Makefile

# convert less -> css

LESS_FILE = public/less/styles.less
CSS_FILE = public/css/styles.css
CSS_MIN_FILE = public/css/styles.min.css

all: $(CSS_FILE) $(CSS_MIN_FILE)

$(CSS_FILE): $(LESS_FILE)
	lessc $< > $@

$(CSS_MIN_FILE): $(LESS_FILE)
	lessc --compress $< > $@
