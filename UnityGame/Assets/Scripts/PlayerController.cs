// Assets/Scripts/PlayerController.cs
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    public float moveSpeed = 5f;
    public int maxHealth = 100;
    public int currentHealth;
    public GameObject swordPrefab;
    public Transform attackPoint;
    public float attackRange = 1.5f;
    public int attackDamage = 25;
    public LayerMask enemyLayers;
    public KeyCode attackKey = KeyCode.Space;
    public KeyCode useMateKey = KeyCode.E;
    public int maxMate = 3;
    public int currentMate;
    public int healPerMate = 30;

    private Rigidbody2D rb;
    private Vector2 movement;

    void Start()
    {
        rb = GetComponent<Rigidbody2D>();
        currentHealth = maxHealth;
        currentMate = maxMate;
    }

    void Update()
    {
        // Input
        movement.x = Input.GetAxisRaw("Horizontal");
        movement.y = Input.GetAxisRaw("Vertical");
        movement = movement.normalized;

        if (Input.GetKeyDown(attackKey))
        {
            Attack();
        }
        if (Input.GetKeyDown(useMateKey))
        {
            UseMate();
        }
    }

    void FixedUpdate()
    {
        rb.MovePosition(rb.position + movement * moveSpeed * Time.fixedDeltaTime);
    }

    void Attack()
    {
        // Simple melee attack using OverlapCircle
        Collider2D[] hitEnemies = Physics2D.OverlapCircleAll(attackPoint.position, attackRange, enemyLayers);
        foreach (Collider2D enemy in hitEnemies)
        {
            enemy.GetComponent<EnemyController>()?.TakeDamage(attackDamage);
        }
    }

    void UseMate()
    {
        if (currentMate > 0 && currentHealth < maxHealth)
        {
            currentHealth = Mathf.Min(maxHealth, currentHealth + healPerMate);
            currentMate--;
            Debug.Log($"Mate consumido. Salud: {currentHealth}/{maxHealth}, Mate restante: {currentMate}");
        }
    }

    public void TakeDamage(int damage)
    {
        currentHealth -= damage;
        if (currentHealth <= 0)
        {
            Die();
        }
    }

    void Die()
    {
        Debug.Log("Jugador muerto. Game Over.");
        // Simple restart
        UnityEngine.SceneManagement.SceneManager.LoadScene(UnityEngine.SceneManagement.SceneManager.GetActiveScene().name);
    }

    void OnDrawGizmosSelected()
    {
        if (attackPoint == null) return;
        Gizmos.DrawWireSphere(attackPoint.position, attackRange);
    }
}


public class PlayerController : MonoBehaviour {
    public float moveSpeed = 5f;
    public int maxHealth = 100;
    private int currentHealth;
    public GameObject swordPrefab;
    public Transform attackPoint;
    public float attackRange = 1.5f;
    public int attackDamage = 25;
    public LayerMask enemyLayers;
    private Rigidbody2D rb;
    private Vector2 movement;

    void Start() {
        rb = GetComponent<Rigidbody2D>();
        currentHealth = maxHealth;
    }

    void Update() {
        // Input
        movement.x = Input.GetAxisRaw("Horizontal");
        movement.y = Input.GetAxisRaw("Vertical");
        movement = movement.normalized;

        // Attack
        if (Input.GetKeyDown(KeyCode.Space)) {
            Attack();
        }
    }

    void FixedUpdate() {
        rb.MovePosition(rb.position + movement * moveSpeed * Time.fixedDeltaTime);
    }

    void Attack() {
        // Simple melee attack using OverlapCircle
        Collider2D[] hitEnemies = Physics2D.OverlapCircleAll(attackPoint.position, attackRange, enemyLayers);
        foreach (Collider2D enemy in hitEnemies) {
            EnemyController ec = enemy.GetComponent<EnemyController>();
            if (ec != null) {
                ec.TakeDamage(attackDamage);
            }
        }
    }

    public void TakeDamage(int dmg) {
        currentHealth -= dmg;
        if (currentHealth <= 0) {
            Die();
        }
    }

    void Die() {
        // Simple death handling
        Debug.Log("Player died");
        gameObject.SetActive(false);
        // You could trigger Game Over UI here
    }

    private void OnDrawGizmosSelected() {
        if (attackPoint == null) return;
        Gizmos.DrawWireSphere(attackPoint.position, attackRange);
    }
}
