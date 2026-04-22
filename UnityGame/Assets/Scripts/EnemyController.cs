using UnityEngine;

/// <summary>
/// Enemigo básico que patrulla o persigue al jugador.
/// </summary>
[RequireComponent(typeof(Rigidbody2D))]
public class EnemyController : MonoBehaviour
{
    public float moveSpeed = 3f;
    public int maxHealth = 50;
    public int attackDamage = 15;
    public float attackCooldown = 1.5f;
    public float detectionRange = 5f;
    public LayerMask playerLayer;

    private Rigidbody2D rb;
    private Transform player;
    private float lastAttackTime;
    private int currentHealth;

    void Start()
    {
        rb = GetComponent<Rigidbody2D>();
        currentHealth = maxHealth;
        var playerObj = GameObject.FindGameObjectWithTag("Player");
        if (playerObj != null) player = playerObj.transform;
    }

    void FixedUpdate()
    {
        if (player == null) return;
        float distance = Vector2.Distance(transform.position, player.position);
        if (distance <= detectionRange)
        {
            Vector2 dir = (player.position - transform.position).normalized;
            rb.MovePosition(rb.position + dir * moveSpeed * Time.fixedDeltaTime);
        }
    }

    void Update()
    {
        if (player == null) return;
        float dist = Vector2.Distance(transform.position, player.position);
        if (dist <= 1.2f && Time.time - lastAttackTime >= attackCooldown)
        {
            Attack();
            lastAttackTime = Time.time;
        }
    }

    void Attack()
    {
        var playerCtrl = player.GetComponent<PlayerController>();
        if (playerCtrl != null) playerCtrl.TakeDamage(attackDamage);
    }

    public void TakeDamage(int dmg)
    {
        currentHealth -= dmg;
        if (currentHealth <= 0) Die();
    }

    void Die()
    {
        Destroy(gameObject);
    }
}
