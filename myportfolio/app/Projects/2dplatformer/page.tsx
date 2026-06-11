"use client";
import FileExplorer from "@/app/components/fileexplorer";
import Navbar from "@/app/components/Navbar";
import React from 'react'

function page() {
  return (
    <>
    <Navbar/>
    <div className="ProjectDescription">
  <div className="Text">
    <h2>2D Platformer</h2>

    <h3>Overview</h3>
    <p>
      This project was built as a "No Tutorial Challenge" to strengthen my problem solving and gameplay programming skills.
      The goal was to build a complete 2D platformer while minimizing reliance on step-by-step tutorials and implementing core systems independently.
    </p>

    <h3>Core Features</h3>
    <ul>
      <li>Player movement</li>
      <li>Combat mechanics</li>
      <li>Health management</li>
      <li>Animation handling</li>
      <li>Enemy interaction</li>
      <li>Tilemap-based level construction</li>
    </ul>

    <h3>Key Learnings</h3>
    <p>
      Through this project I gained practical experience with Unity’s New Input System,
      gameplay scripting, state management, and level design workflows.
    </p>
  </div>

  <div className="Image">
    <img src="/2dplatformer.png" alt="2D Platformer" />
  </div>
</div>
<div className="ProjectDescription">
<div>
  <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7358734733859545089?compact=1" height="399"  allowFullScreen width="504" title="2D Platformer"></iframe>
</div>
</div>

<div className="ProjectDescription">
  <div className="Text">
    <h2> Code Snippets</h2>
  

  <div className="CodeSection">
    <FileExplorer
    files = {[
      { filename: "CharacterMove.cs",
      language: "C#",
      code: `
using UnityEngine;
using UnityEngine.InputSystem;
public class CharacterMove : MonoBehaviour
{
    //rigidBody
    public Rigidbody2D rb;

    //Speed 
    public float speed = 5f;

    // Initials for WASD movement
    private Vector2 move = Vector2.zero;
    public PlayerMovement playerMovement;


    private InputAction Move;
    private InputAction jump;
    private InputAction Attack;


    [SerializeField] private Transform Soldier;
    public Transform groundCheck;
    private float jumpForce = 8f;
    public LayerMask groundLayer;
    private bool isFacingRight = true;



    private void Awake()
    {
        playerMovement = new PlayerMovement();
    }
    
    private void OnEnable()
    {
        Attack = playerMovement.Player.Attack;
        Attack.Enable();
        Move = playerMovement.Player.Move;
        jump = playerMovement.Player.Jump;
        Move.Enable();
        jump.Enable();
        jump.performed += Jump;
    }


    private void OnDisable()
    {
        Attack.Disable();
        Move.Disable();
        jump.Disable();
        jump.performed -= Jump;

    }
    private void FixedUpdate()
    {
        move = Move.ReadValue<Vector2>();
        float moveX = Mathf.Clamp(move.x, -1f, 1f);
        rb.linearVelocity = new Vector2(move.x * speed, rb.linearVelocity.y);
    }
    private void Update()
    {
        move = Move.ReadValue<Vector2>();

        if (move.x > 0.1f && !isFacingRight)
        {
            Flip();
        }
        else if (move.x < -0.1f && isFacingRight)
        {
            Flip();
        }

        AttackAni();
    }

    private void Flip()
    {
        isFacingRight = !isFacingRight;
        Vector3 localScale = Soldier.localScale;
        localScale.x *= -1f;
        Soldier.localScale = localScale;
    }

    private bool isGrounded()
    {
        return Physics2D.OverlapCircle(groundCheck.position, 0.2f, groundLayer);
    }
    private void Jump(InputAction.CallbackContext context)
    {
        if (context.performed && isGrounded())
        {

            rb.linearVelocity = new Vector2(rb.linearVelocity.x, jumpForce);

        }
        if (context.canceled && rb.linearVelocity.y > 0.1f)
        {
            rb.linearVelocity = new Vector2(rb.linearVelocity.x, rb.linearVelocity.y * 0.5f);
        }


    }


    private void AttackAni()
    {
        if (Attack.IsPressed())
        {
            Debug.Log("Attck performed");
            Animator.FindAnyObjectByType<PlayerInputManager>();
            

        }
    }

}
`
    },
    {filename:"RespawnbyDmg.cs",
      language:"C#",
      code: `using System;
using UnityEditor.Callbacks;
using UnityEngine;
using UnityEngine.Tilemaps;

public class RespawnByDamage : MonoBehaviour
{
    public Transform RespawnPoint;
    public Transform Player;
    public Tilemap DamagePlayer;

    public LayerMask hazardLayer;

    public Rigidbody2D Damagerb;
    public Rigidbody2D PlayerRb;
    private Vector3 InitialSpawn;
    void Start()
    {
        InitialSpawn = Player.position;

    }
    void OnTriggerEnter2D(Collider2D collision)
    {
        if (((1 << collision.gameObject.layer) & hazardLayer)!= 0)
        {
            Respawn();
        }

    }

    private void Respawn()
    {
        PlayerRb.linearVelocity = Vector2.zero;
        Player.position = InitialSpawn;
        Debug.Log("Should Respawn");
    }
}
`
    },
    {filename:"CameraScroll",
      language: "C#",
      code: `using UnityEngine;

public class CamScroll : MonoBehaviour
{
    public Transform MainCamera;
    private float minCam = -4f;
    private float maxCam = 4f;
    public Transform Player;



    private void FixedUpdate()
    {
        // keep camera centered to screen with max min float value;

        if (Mathf.Abs(Player.position.y - MainCamera.position.y) >= maxCam)
        {
            MainCamera.position = new Vector3(Mathf.Clamp(MainCamera.position.x, minCam, maxCam), MainCamera.position.y, 0);

        }
        else if (Mathf.Abs(Player.position.y - MainCamera.position.y) <= minCam)
        {
            MainCamera.position = new Vector3(Mathf.Clamp(MainCamera.position.x, minCam, maxCam), MainCamera.position.y, 0);
        }
    }

    void Update()
    {
        MainCamera.position = new Vector3(Player.position.x , MainCamera.position.y, 0);
    }
}
`
    }
    ]}
    />
    </div>
  </div>
</div>
    </>
  )
}

export default page