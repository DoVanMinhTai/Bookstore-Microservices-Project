INSERT INTO book_publisher (id, name) VALUES
  (1, 'NXB Trẻ'),
  (2, 'NXB Kim Đồng'),
  (3, 'NXB Tổng Hợp TP.HCM'),
  (4, 'Nhã Nam'),
  (5, 'Alphabooks')
ON CONFLICT (id) DO UPDATE
SET name = EXCLUDED.name;