#!/bin/bash

# Script để cập nhật tất cả các trang HTML để sử dụng header và footer chung

# Cập nhật các trang frontend
echo "Đang cập nhật các trang frontend..."
for file in $(find . -maxdepth 1 -name "*.html" -not -name "index.html"); do
  echo "Cập nhật $file"
  
  # Thay thế phần header
  sed -i '' -e '/<body>/,/<div class="container">/c\
<body>\
    <!-- Header -->\
    <div id="header-placeholder"></div>\
    <!-- End Header -->\
\
    <div class="container">' "$file"
  
  # Thay thế phần footer
  sed -i '' -e '/<footer/,/<\/footer>/c\
    <!-- Footer -->\
    <div id="footer-placeholder"></div>\
    <!-- End Footer -->' "$file"
  
  # Thêm script include.js
  sed -i '' -e '/<script src="js\/app.js"><\/script>/a\
    <script src="js/include.js"></script>' "$file"
done

# Cập nhật các trang admin
echo "Đang cập nhật các trang admin..."
for file in $(find ./admin -name "*.html" -not -name "dashboard.html"); do
  echo "Cập nhật $file"
  
  # Thay thế phần header (sidebar và navbar)
  sed -i '' -e '/<div class="wrapper">/,/<div id="content">/c\
<div class="wrapper">\
    <!-- Header -->\
    <div id="header-placeholder"></div>\
    <!-- End Header -->\
\
    <!-- Page Content -->\
    <div id="content">' "$file"
  
  # Thay thế phần footer
  sed -i '' -e '/<\/div>\s*<\/div>\s*<\/div>/c\
            </div>\
        </div>\
        \
        <!-- Footer -->\
        <div id="footer-placeholder"></div>\
        <!-- End Footer -->\
    </div>' "$file"
  
  # Thêm script include.js
  sed -i '' -e '/<script src="https:\/\/cdn.jsdelivr.net\/npm\/bootstrap/a\
    <script src="js/include.js"></script>' "$file"
done

echo "Hoàn tất cập nhật!"