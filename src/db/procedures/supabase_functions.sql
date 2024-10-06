-- Supabase modification

CREATE OR REPLACE FUNCTION create_order(
  p_items json,
  p_debt_id text,
  p_amount numeric,
  p_status text
) RETURNS json AS $$
DECLARE
  v_order_id int;
  v_item json;
BEGIN
  -- Insert the order
  INSERT INTO orders (debt_id, amount, status)
  VALUES (p_debt_id, p_amount, p_status)
  RETURNING id INTO v_order_id;

  -- Insert order items
  FOR v_item IN SELECT * FROM json_array_elements(p_items)
  LOOP
    INSERT INTO order_items (order_id, product_id, quantity)
    VALUES (v_order_id, (v_item->>'id')::int, (v_item->>'quantity')::int);
  END LOOP;

  -- Return the created order
  RETURN (SELECT row_to_json(o) FROM orders o WHERE id = v_order_id);
END;
$$ LANGUAGE plpgsql;