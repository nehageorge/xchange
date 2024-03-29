"""CourseEquivalency code and student_program size increased

Revision ID: 5cb806a3a192
Revises: 5d71a39c734c
Create Date: 2023-08-13 22:54:38.785951

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '5cb806a3a192'
down_revision = '5d71a39c734c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('course_equivalency', schema=None) as batch_op:
        batch_op.alter_column('code',
               existing_type=mysql.VARCHAR(length=128),
               type_=sa.String(length=200),
               existing_nullable=True)
        batch_op.alter_column('student_program',
               existing_type=mysql.VARCHAR(length=120),
               type_=sa.String(length=150),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('course_equivalency', schema=None) as batch_op:
        batch_op.alter_column('student_program',
               existing_type=sa.String(length=150),
               type_=mysql.VARCHAR(length=120),
               existing_nullable=True)
        batch_op.alter_column('code',
               existing_type=sa.String(length=200),
               type_=mysql.VARCHAR(length=128),
               existing_nullable=True)

    # ### end Alembic commands ###
